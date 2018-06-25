(function() {
    'use strict';
    angular.module('app')
        .directive('generalTab', function () {
            return {
                templateUrl: 'form-builder/modal/config/config.general.html',
                scope: {
                    content: '=content',
                    formName: '=formName'
                },
                link: function () {
                }
            }
        });
}());