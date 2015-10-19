var SupplierNewCntlr = (function () {
    function SupplierNewCntlr($scope) {
        this.initPlugins();
    }
    SupplierNewCntlr.prototype.initPlugins = function () {
        if ($('#dropzone1').length) {
            var dropZoneConfig = {
                url: '/api/files',
                paramName: 'file',
                maxFiles: 1,
                maxFilesize: 2,
                addRemoveLinks: true
            };
            var dropzone1 = new Dropzone('#dropzone1', dropZoneConfig);
        }
        if ($('#dropzone2').length) {
            var dropZoneConfig2 = {
                url: '/api/files',
                paramName: 'file',
                maxFilesize: 2,
                addRemoveLinks: true
            };
            var dropzone2 = new Dropzone('#dropzone2', dropZoneConfig2);
        }
    };
    SupplierNewCntlr.$inject = ['$scope'];
    return SupplierNewCntlr;
})();
