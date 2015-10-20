/// <reference path="../../../../../../lib/definitely_typed/bluebird/bluebird.d.ts"/>

export = Activiti.Utils;

import Exception = require('./exception');

var http = require('http');

module Activiti {
   export interface IHttpResponse {
      statusCode: number
   }

   export class Utils {
      public static httpPost(user, password, data) : Promise<IHttpResponse> {
         return new Promise<IHttpResponse>((resolve, reject) => {
            var options = {
               host: process.env.ACTIVITI_PORT_8080_TCP_ADDR,
               port: process.env.ACTIVITI_PORT_8080_TCP_PORT,
               path: '/activiti-rest/service/runtime/process-instances',
               method: 'POST',
               auth: user + ':' + password,
               headers: {
                  'Content-Type': 'application/json'
               }
            };

            var req = http.request(options, (response) => {
               resolve({
                  statusCode: response.statusCode
               });
            });

            req.on('error', (err) => {
               reject(new Exception(Exception.CONNECTION_ERROR));
            });

            req.write(JSON.stringify(data));
            req.end();
         });
      }
   }
}
