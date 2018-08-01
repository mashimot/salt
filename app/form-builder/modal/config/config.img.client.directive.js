(function() {
    'use strict';
    angular.module('app')
        .directive('imgTab', function () {
            return {
                templateUrl: 'form-builder/modal/config/config.img.html',
                scope: {
                    content: '=content',
                    formName: '=formName'
                },
                link: function () {
                }
            }
        });
}());