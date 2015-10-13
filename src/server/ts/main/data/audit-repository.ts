/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

import BaseRepository = require('./../data/base-repository');

var r = require('rethinkdb');

class ComplaintRepository extends BaseRepository<IAuditModel> {
   public constructor() {
      super(BaseRepository.COMPLAINT_TABLE_NAME);
   }

   public get(id: string) : Promise<IAuditModel> {
      var query = r.db(BaseRepository.DB_NAME)
         .table(BaseRepository.AUDIT_TABLE_NAME)
         .get(id)
         .merge(function(audit) {
            return {
               supplier: r.db(BaseRepository.DB_NAME)
                           .table(BaseRepository.USER_TABLE_NAME)
                           .get(audit('supplierId')),
               details: r.db(BaseRepository.DB_NAME)
                           .table(BaseRepository.AUDIT_DETAIL_TABLE_NAME)
                           .filter({auditId: audit("id")})
                           .nth(0)
                           .without("auditId"),
               checklist: r.db(BaseRepository.DB_NAME)
                           .table(BaseRepository.CHECKLIST_TABLE_NAME)
                           .get(audit("checklistId"))
                           .merge(function(checklist) {
                              return {
                                 forms: r.db(BaseRepository.DB_NAME)
                                          .table(BaseRepository.FORM_TABLE_NAME)
                                          .filter({checklistId: checklist('id')})
                                          .coerceTo('array')
                              }
                           })
            }
         })
         .without('supplierId', 'checklistId');

      return new Promise<IAuditModel>((resolve, reject) => {
         this.runSimpleQuery<IAuditModel>(query).then(
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

export = ComplaintRepository;
