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

interface IFormOptionModel {
   name: string;
   value: number;
}

interface IFormModel extends IBaseModel {
   name: string;
   questions: string[];
   options: IFormOptionModel[];
}

interface IChecklistModel extends IBaseModel {
   userId: string;
   name: string;
   forms: IFormModel[];
}

interface IClientModel extends IBaseModel {

}

interface ISupplierModel extends IBaseModel {

}

enum ComplaintSeverity {
   Low,
   Medium,
   High
}

interface IComplaintModel extends IBaseModel {
   reporter: string,
   supplier: IUserModel,
   text: string,
   severity: ComplaintSeverity
}

interface IAuditModel extends IBaseModel {
   checklistId: string;
   score: number;
}
