var AuditNewCntlr = (function () {
    function AuditNewCntlr($scope) {
    }
    AuditNewCntlr.prototype.initPlugins = function () {
        $('#side-menu').metisMenu();
    };
    AuditNewCntlr.$inject = ['$scope'];
    return AuditNewCntlr;
})();
