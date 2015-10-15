/// <reference path="../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

var r = require('rethinkdb');

class BaseRepository<T extends IBaseModel> {
   public static DB_NAME: string = 'gsos';
   public static USER_TABLE_NAME = 'user';
   public static COMPLAINT_TABLE_NAME = 'complaint';
   public static CHECKLIST_TABLE_NAME = 'checklist';
   public static SUPPLIER_TABLE_NAME = 'supplier';
   public static CLIENT_TABLE_NAME = 'client';
   public static FORM_TABLE_NAME = 'form';
   public static AUDIT_TABLE_NAME = 'audit';
   public static AUDIT_DETAIL_TABLE_NAME = 'audit_detail';

   private connection;
   private tableName: string;

   public constructor(tableName: string) {
      this.tableName = tableName;
   }

   public create(doc: T): Promise<T> {
      if (doc.createdAt == null) doc.createdAt = this.formatDate(new Date());
      if (doc.status == null) doc.status = 'active';

      return new Promise<T>((resolve, reject) => {
         this.connect().then((conn) => {
            this.connection = conn;
            return r.table(this.tableName)
               .insert(doc)
               .run(conn);
         })
         .then((res) => {
            doc.id = res.generated_keys[0];
            resolve(doc)
         })
         .error((err) => {
            reject(doc);
         })
         .finally(() => {
            this.close();
         });
      });
   }

   public update(doc: T): Promise<T> {
      return new Promise<T>((resolve, reject) => {
         this.connect().then((conn) => {
            this.connection = conn;
            return r.table(this.tableName)
               .get(doc.id)
               .update(doc)
               .run(conn);
         })
         .then((res) => {
            resolve(doc)
         })
         .error((err) => {
            reject(doc);
         })
         .finally(() => {
            this.close();
         });
      });
   }

   public get(id: string): Promise<T> {
      return new Promise<T>((resolve, reject) => {
         this.connect().then((conn) => {
            this.connection = conn;
            return r.table(this.tableName)
               .get(id)
               .run(conn);
         })
         .then((res) => {
            resolve(res)
         })
         .error((err) => {
            reject(err);
         })
         .finally(() => {
            this.close();
         });
      });
   }

   public getAll(filter: any): Promise<T[]> {
      return new Promise<T[]>((resolve, reject) => {
         this.connect().then((conn) => {
            this.connection = conn;
            return r.table(this.tableName)
               .filter(filter)
               .coerceTo('array')
               .run(conn);
         })
         .then((res) => {
            resolve(res)
         })
         .error((err) => {
            reject(err);
         })
         .finally(() => {
            this.close();
         });
      });
   }

   public runSimpleQuery<U>(query: any): Promise<U> {
      return new Promise<U>((resolve, reject) => {
         this.connect().then((conn) => {
            this.connection = conn;
            return query.run(conn);
         })
         .then((res) => {
            resolve(res)
         })
         .error((err) => {
            reject(err);
         })
         .finally(() => {
            this.close();
         });
      });
   }

   public runQuery<U>(query: any): Promise<U[]> {
      return new Promise<U[]>((resolve, reject) => {
         this.connect().then((conn) => {
            this.connection = conn;
            return query.run(conn);
         })
         .then((res) => {
            resolve(res)
         })
         .error((err) => {
            reject(err);
         })
         .finally(() => {
            this.close();
         });
      });
   }

   private formatDate(date): string {
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth() + 1).toString();
      var dd = date.getDate().toString();
      return (dd[1]?dd:'0'+dd[0]) + '-' + (mm[1]?mm:'0'+mm[0]) +'-' + yyyy;
   }

   private connect() {
      var config = {
         host: process.env.DB_PORT_28015_TCP_ADDR,
         port: process.env.DB_PORT_28015_TCP_PORT,
         db: BaseRepository.DB_NAME
      };
      return r.connect(config);
   }

   private close() {
      if (this.connection) {
         return this.connection.close({
            noreplyWait: false
         });
      }
   }
}

export = BaseRepository;
