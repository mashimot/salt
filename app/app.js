(function(){
    'use strict';
    angular.module('app', [
            'ui.router',
            'ui-notification',
            'blocks.logger',
            'ui.bootstrap',
            'ui.sortable',
            'spell.checker',
            'render.nested.html',
            'bind.html.compile',
            'angular.filter',
            'collection.service',
            'ngMessages'
        ])
    .config(bootstrapConfig);
    bootstrapConfig.$inject = ['$stateProvider', "$urlRouterProvider", "$locationProvider"];

    function bootstrapConfig($stateProvider, $urlRouterProvider, $locationProvider){
        $urlRouterProvider.otherwise('/salt');
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
                }
            }
        })
    }
}());