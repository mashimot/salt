(function(){
    'use strict';

    angular.module('app')
    .directive('camelCase', camelCase);
    camelCase.$inject = [];

    function camelCase(){
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                applyTo: '='
            },
            link: link
        };
        function link(scope, element, attr){
            scope.$watch('ngModel', function(nV, oV){
                if(scope.ngModel !== undefined){
                    scope.applyTo = scope.ngModel.replace(/_([a-z])/g, function (g) {
                        return g[1].toUpperCase();
                    });
                }
            });
        }
    }
})();