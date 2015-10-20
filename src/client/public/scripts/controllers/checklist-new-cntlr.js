var ChecklistNewCntlr = (function () {
    function ChecklistNewCntlr($scope, $timeout) {
        this.initPlugins();
    }
    ChecklistNewCntlr.prototype.initPlugins = function () {
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
    };
    ChecklistNewCntlr.$inject = ['$scope', '$timeout'];
    return ChecklistNewCntlr;
})();
