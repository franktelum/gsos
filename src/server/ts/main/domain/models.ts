interface IBaseModel {
   id: string;
   createdAt: string;
   status: string;
}

interface IUserModel extends IBaseModel {
   email: string;
   password: string;
   profile: {
      firstName: string,
      lastName: string,
      position: string,
      contactEmail: string,
      contactPhone: string,
      contactMobile: string
   }
}

interface IFormModel extends IBaseModel {
   name: string,
   questions: string[],
   options: any[]
}

interface IChecklistModel extends IBaseModel {
   userId: string,
   name: string,
   forms: IFormModel[]
}

interface IClientModel {

}

interface ISupplierModel {

}

enum ComplaintSeverity {
   Low,
   Medium,
   High
}

interface IComplaintModel extends IBaseModel {
   reportes: string,
   supplier: IUserModel,
   text: string,
   severity: ComplaintSeverity
}

interface IAuditModel extends IBaseModel {
   checklistId: string;
   score: number;
}
