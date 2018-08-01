(function() {
    'use strict';
    angular.module('app')
        .directive('titleTab', function(){
            return {
                templateUrl: 'form-builder/modal/config/config.title.html',
                scope: {
                    content: '=',
                    formName: '=formName'
                },
                link: function($scope){
                }
            }
        });
}());
