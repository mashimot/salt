(function(){
    'use strict';
    angular.module('app', [
            'ui.router',
            'ui-notification',
            'blocks.logger',
            'ui.bootstrap',
            'ui.sortable',
            'render.nested.html',
            'bind.html.compile',
            'angular.filter',
            'collection.service',
            'ngMessages',
            'ngSanitize',
            'ngAnimate',
            'spell.checker'
        ])
    .config(bootstrapConfig);
    bootstrapConfig.$inject = ['$stateProvider', "$urlRouterProvider", "$locationProvider"];
    //angular.module('new.app', []);
    function bootstrapConfig($stateProvider, $urlRouterProvider, $locationProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('app', {
            url: '/',
            views: {
                menu: {
                    templateUrl: 'menu.html'
                }
            }
        })
        .state('app.home', {
            url: 'home',
            views: {
                'content@': {
                    template: `<h1 class="text-danger">HOME</h1>`
                    //templateUrl: 'form-builder/form-builder.html'
                }
            }
        })
    }
}());