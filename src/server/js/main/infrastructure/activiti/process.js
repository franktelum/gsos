var Exception = require('./exception');
var Utils = require('./utils');
var Activiti;
(function (Activiti) {
    var Process = (function () {
        function Process() {
        }
        Process.start = function (key, variables, email, password) {
            return new Promise(function (resolve, reject) {
                var data = {
                    processDefinitionKey: key,
                    variables: variables
                };
                Utils.httpPost(email ? email : 'kermit', password ? password : 'kermit', data).then(function (response) {
                    if (response.statusCode == 201) {
                        resolve(new Process());
                    }
                    else {
                        reject(new Exception(Exception.PROCESS_DEFINITION_NOT_FOUND));
                    }
                }, function (err) {
                    console.log('Error aqui 1');
                    reject(err);
                });
            });
        };
        Process.get = function (id) {
            return null;
        };
        return Process;
    })();
    Activiti.Process = Process;
})(Activiti || (Activiti = {}));
module.exports = Activiti.Process;
