(function(){
    angular.module('app')
        .directive('formMenu', formMenu);

    formMenu.$inject = [];

    function formMenu(){
        return {
            restrict: "EA",
            templateUrl: 'form-builder/form-menu/form-menu.html',
            scope: {
                pages: '=pages',
                tools: '=',
                pageModel: '='
            },
            controller: 'FormMenuController',
            controllerAs: 'vmMenu',
            bindToController: true
        };
    }
})();
