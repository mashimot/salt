(function(){
    'use strict';
    angular.module('app')
        .config(routeConfig);
        routeConfig.$inject = ['$stateProvider', "$urlRouterProvider", "$locationProvider"];

    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('app', {
                url: '/',
                views: {
                    menu: {
                        templateUrl: 'menu.html'
                    },
                    content: {
                        templateUrl: 'form-builder/form-builder.html'
                    }
                }
            });
    }
}());