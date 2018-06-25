(function(){
    'use strict';

    angular.module('new.app')
        .directive('sqlToView', SqlToView);
      SqlToView.$inject = ['RenderHtml', 'renderView'];

      function SqlToView(RenderHtml, renderView){
        return {
            //templateUrl: templateUrl,
            template: `
            <div class="form-group">
                <div class="radio" ng-repeat="ff in frontEndFrameworks">
                    <label><input type="radio" name="front_end_framework" ng-model="frontEnd.selected" ng-value="ff"> {{ ff.name }}</label>
                </div>
            </div>
            <div ng-init="tplUrl = templateUrl()" ng-include="tplUrl"></div>`,            
            restrict: 'E',
            scope: {
                data       : '=vmData',
                content    : '=preview',
                view       : '=',
            },
            controller: controller,
            link: link
        };

        function controller($scope){
            $scope.content = '';
            $scope.view = view();

            $scope.frontEndFrameworks = [{
                cod_front_end_framework: 0,
                id: 'vuejs',
                name: 'Vue.JS',
                templateUrl: 'template/view/vuejs.html'
            }/*,{
                cod_front_end_framework: 1,
                id: 'laravel',
                name: 'Laravel',
                templateUrl: 'template/view/laravel.html'
            }*/];   

            $scope.frontEnd = { 
                selected : $scope.frontEndFrameworks[0]
            };

            $scope.templateUrl = function(){
                return $scope.frontEnd.selected.templateUrl;
            }
        }

        function link(scope, elem, attr){
            scope.$watch('frontEnd.selected', function(nV, oV){
                /*var data = angular.copy(scope.data);
                RenderHtml.setParams(huehue);
                scope.content = RenderHtml.getByType(0)['text'];
                renderView.getView(data).then(function(r){
                    //console.log(r); 
                    scope.content = r;
                });*/
            });
            scope.preview = function(){
                var pages = angular.copy(scope.pages);
                renderView.show(scope.content).then(function(r){
                    scope.content = r;
                });                     
            }
        }

        function getTemplateUrl(frontEndFramework){
            console.log(frontEndFramework.templateUrl);
            return frontEndFramework.templateUrl;
        }

        function view(){
            return {
                name: '',
                title: ''
            };
        }        
    }
})();