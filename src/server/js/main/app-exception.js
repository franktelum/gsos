var AppException = (function () {
    function AppException(code) {
        this.code = code;
    }
    AppException.prototype.getCode = function () {
        return this.code;
    };
    AppException.SERVER_ERROR = 1;
    AppException.OBJECT_NOT_FOUND = 2;
    AppException.EMAIL_OR_PASSWORD_INVALID = 3;
    AppException.DB_UNKNOWN_ERROR = 4;
    AppException.EMAIL_MISSING = 5;
    AppException.PASSWORD_MISSING = 6;
    AppException.UNKNOWN = 100;
    return AppException;
})();
module.exports = AppException;
