export = Activiti.Exception;

module Activiti {
   export class Exception {
      public static SERVER_ERROR = 1;
      public static PROCESS_DEFINITION_NOT_FOUND = 2;
      public static USER_INVALID = 3;
      public static CONNECTION_ERROR = 4;
      public static UNKNOWN = 100;

      private code: number;

      public constructor(code: number) {
         this.code = code;
      }

      public getCode() : number {
         return this.code;
      }
   }
}
