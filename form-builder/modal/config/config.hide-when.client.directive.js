(function(){
    'use strict';
    angular.module('app')
    .directive('hideWhenTab', hideWhenTab);
    hideWhenTab.$inject = ['$sce']

    function hideWhenTab($sce){
        return {
            templateUrl: 'form-builder/modal/config/is-hide-when.html',
            scope: {
                content: '='
            },
            link: function($scope){
                $scope.get_pre = function(x) {
                    return $sce.trustAsHtml(x);
                };
            }

        }
    }
}());
