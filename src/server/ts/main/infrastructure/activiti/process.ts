/// <reference path="../../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

export = Activiti.Process;

import Exception  = require('./exception');
import Utils      = require('./utils');

module Activiti {
   export class Process {
      public constructor() {

      }

      /**
       * Inicia un proceso.
       *
       * @param  {string}           key       [description]
       * @param  {any}              variables [description]
       * @return {Promise<Process>}           [description]
       */
      public static start(key: string, variables: any): Promise<Process> {
         return new Promise<Process>((resolve, reject) => {
            var data = {
               processDefinitionKey: key,
               variables: variables
            };

            Utils.httpPost('kermit', 'kermit', data).then(
               (response) => {
                  if (response.statusCode == 201) {
                     resolve(new Process());
                  } else {
                     reject(new Exception(Exception.PROCESS_DEFINITION_NOT_FOUND));
                  }
               },
               (err) => {
                  console.log('Error aqui 1');
                  reject(err);
               }
            );
         });
      }

      public static get(id: string): Promise<Process> {
         return null;
      }
   }
}
