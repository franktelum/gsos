class AppException {
   public static SERVER_ERROR = 1;
   public static OBJECT_NOT_FOUND = 2;
   public static EMAIL_OR_PASSWORD_INVALID = 3;
   public static DB_UNKNOWN_ERROR = 4;
   public static EMAIL_MISSING = 5;
   public static PASSWORD_MISSING = 6;
   public static UNKNOWN = 100;

   private code: number;

   public constructor(code: number) {
      this.code = code;
   }

   public getCode() : number {
      return this.code;
   }
}

export = AppException;
