class AppException {
   public static SERVER_ERROR = 1;
   public static OBJECT_NOT_FOUND = 2;
   public static DB_ERROR = 3;

   private code: number;

   public constructor(code: number) {
      this.code = code;
   }

   public getCode() : number {
      return this.code;
   }
}
