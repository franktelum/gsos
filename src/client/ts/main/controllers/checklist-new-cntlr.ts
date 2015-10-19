/// <reference path="../../../../../lib/definitely_typed/jquery/jquery.d.ts"/>
/// <reference path="../../../../../lib/definitely_typed/dropzone/dropzone.d.ts"/>

class ChecklistNewCntlr {
   public static $inject = ['$scope', '$timeout'];

   public constructor($scope, $timeout) {
      this.initPlugins();
   }

   private initPlugins() {
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
   }
}
