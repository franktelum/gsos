var AppException = (function () {
    function AppException(code) {
        this.code = code;
    }
    AppException.prototype.getCode = function () {
        return this.code;
    };
    AppException.SERVER_ERROR = 1;
    AppException.OBJECT_NOT_FOUND = 2;
    AppException.DB_ERROR = 3;
    return AppException;
})();
