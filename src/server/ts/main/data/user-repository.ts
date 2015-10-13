/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

'use strict'

import BaseRepository = require('./../data/base-repository');

var r = require('rethinkdb');

class UserRepository extends BaseRepository<IUserModel> {
   public constructor() {
      super(BaseRepository.USER_TABLE_NAME);
   }

   public getByEmail(email: string, password: string): Promise<IUserModel> {
      return new Promise<IUserModel>((resolve, reject) => {
         super.getAll({email: email, password: password}).then(
            (response) => {
               resolve(response[0]);
            },
            (err) => {
               reject(null);
            }
         );
      });
   }

   /**
   * Regresa todos los proveedores asociados al usuario identificado con 'id'.
   *
   * @param  {string}                id [description]
   * @return {Promise<IUserModel[]>}    [description]
   */
   public getSuppliers(id: string): Promise<IUserModel[]> {
      var query = r.db(BaseRepository.DB_NAME)
      .table(BaseRepository.SUPPLIER_TABLE_NAME)
      .filter({userId: id})
      .eqJoin('supplierId', r.db(BaseRepository.DB_NAME).table(BaseRepository.USER_TABLE_NAME))
      .map(function(item) {
         return item('right');
      })
      .coerceTo('array');

      return new Promise<IUserModel[]>((resolve, reject) => {
         this.runQuery<IUserModel>(query).then(
            (res) => {
               resolve(res)
            },
            (err) => {
               reject(err);
            }
         );
      });
   }

   /**
   * Regresa todos los clientes asociados al usuario identificado con 'id'.
   *
   * @param  {string}                id [description]
   * @return {Promise<IUserModel[]>}    [description]
   */
   public getClients(id: string): Promise<IUserModel[]> {
      var query = r.db(BaseRepository.DB_NAME)
      .table(BaseRepository.CLIENT_TABLE_NAME)
      .filter({userId: id})
      .eqJoin('clientId', r.db(BaseRepository.DB_NAME).table(BaseRepository.USER_TABLE_NAME))
      .map(function(item) {
         return item('right');
      })
      .coerceTo('array');

      return new Promise<IUserModel[]>((resolve, reject) => {
         this.runQuery<IUserModel>(query).then(
            (res) => {
               resolve(res)
            },
            (err) => {
               reject(err);
            }
         );
      });
   }

   public getComplaints(id: string): Promise<IComplaintModel[]> {
      var query = r.db(BaseRepository.DB_NAME)
         .table(BaseRepository.COMPLAINT_TABLE_NAME)
         .filter({userId: id})
         .merge(function(complaint) {
            return {
               supplier: r.db(BaseRepository.DB_NAME)
                           .table(BaseRepository.USER_TABLE_NAME)
                           .get(complaint('supplierId'))
            }
         })
         .without('supplierId')
         .coerceTo('array');

      return new Promise<IComplaintModel[]>((resolve, reject) => {
         this.runQuery<IComplaintModel>(query).then(
            (res) => {
               resolve(res)
            },
            (err) => {
               reject(err);
            }
         );
      });
   }

   public getChecklists(id: string) : Promise<IChecklistModel[]> {
      var query = r.db(BaseRepository.DB_NAME)
         .table(BaseRepository.CHECKLIST_TABLE_NAME)
         .filter({userId: id})
         .merge(function(checklist) {
            return {
               forms: r.db(BaseRepository.DB_NAME)
                           .table(BaseRepository.FORM_TABLE_NAME)
                           .filter({checklistId: checklist('id')})
                           .coerceTo('array')
            }
         })
         .coerceTo('array');

      return new Promise<IChecklistModel[]>((resolve, reject) => {
         this.runQuery<IChecklistModel>(query).then(
            (res) => {
               resolve(res)
            },
            (err) => {
               reject(err);
            }
         );
      });
   }

   public getAudits(id: string) : Promise<IAuditModel[]> {
      var query = r.db(BaseRepository.DB_NAME)
         .table(BaseRepository.AUDIT_TABLE_NAME)
         .filter({userId: id})
         .merge(function(audit) {
            return {
               supplier: r.db(BaseRepository.DB_NAME)
                           .table(BaseRepository.USER_TABLE_NAME)
                           .get(audit('supplierId'))
            }
         })
         .without('supplierId')
         .coerceTo('array');

      return new Promise<IAuditModel[]>((resolve, reject) => {
         this.runQuery<IAuditModel>(query).then(
            (res) => {
               resolve(res)
            },
            (err) => {
               reject(err);
            }
         );
      });
   }
}

export = UserRepository;
