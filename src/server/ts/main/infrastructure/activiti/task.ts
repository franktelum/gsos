/// <reference path="../../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

export = Activiti.Task;

module Activiti {
   export class Task {
      public constructor() {

      }

      public static getTask(id: string): Promise<Task> {
         return null;
      }
   }
}
