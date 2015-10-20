var Exception = require('./exception');
var http = require('http');
var Activiti;
(function (Activiti) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.httpPost = function (user, password, data) {
            return new Promise(function (resolve, reject) {
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
                var req = http.request(options, function (response) {
                    resolve({
                        statusCode: response.statusCode
                    });
                });
                req.on('error', function (err) {
                    reject(new Exception(Exception.CONNECTION_ERROR));
                });
                req.write(JSON.stringify(data));
                req.end();
            });
        };
        return Utils;
    })();
    Activiti.Utils = Utils;
})(Activiti || (Activiti = {}));
module.exports = Activiti.Utils;
