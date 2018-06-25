(function(){
    'use strict';
    angular.module('app')
    .directive('htmlEditor', htmlEditor);
    htmlEditor.$inject = [];

    function htmlEditor(){
        return {
            templateUrl: 'form-builder/modal/config/config.html-editor.html',
            scope: {
                content: '='
            },
            link: function($scope){
            }
        }
    }
}());
