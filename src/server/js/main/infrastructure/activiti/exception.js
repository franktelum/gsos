var Activiti;
(function (Activiti) {
    var Exception = (function () {
        function Exception(code) {
            this.code = code;
        }
        Exception.prototype.getCode = function () {
            return this.code;
        };
        Exception.SERVER_ERROR = 1;
        Exception.PROCESS_DEFINITION_NOT_FOUND = 2;
        Exception.USER_INVALID = 3;
        Exception.CONNECTION_ERROR = 4;
        Exception.UNKNOWN = 100;
        return Exception;
    })();
    Activiti.Exception = Exception;
})(Activiti || (Activiti = {}));
module.exports = Activiti.Exception;
