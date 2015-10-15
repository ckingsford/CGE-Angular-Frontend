'use strict';

/* Directives */

angular.module('myApp.directives', [])
  .directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  })
  .directive('upload', ['$http','uploadManager', function factory($http,uploadManager) {
    return {
        scope: {
            upload: '='
        },
        link: function(scope, el, attrs){
            el.bind('change', function(event){
                var files = event.target.files;
                var file = files[0];
                scope.file = file ? file.name : undefined;
                scope.$apply();
                //alert(scope.file);
                //uploadManager.testMe(scope.file);
                uploadManager.startVCFread(file);
            $http({
              method: 'GET',
              url: '/api/guy'
            }).
                success(function (data, status, headers, config) {
                  scope.guy = data.id;
                }).
                error(function (data, status, headers, config) {
                  scope.guy = 'Error!'
                });
            });
            $http({
                method: 'GET',
                url: '/mysql/model'
            }).
                success(function (data, status, headers, config) {
                    //scope.model = data.model;
                    uploadManager.loadModel(data.model);
                    console.log("directives.js.GET:/mysql/model - model loaded.");
                    //console.log(JSON.stringify(data.model));
                }).
                error(function (data, status, headers, config) {
                    console.log("directives.js.GET:/mysql/model - ERROR loading model.");
                });
        }
    };
}]);