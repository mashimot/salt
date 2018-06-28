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
                pages      : '=vmPages',
                content    : '=preview',
                view       : '='
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
                scope.$watch('pages', function(pages){
                    var fullHtml = '';
                    if(pages.length > 0 && pages.length !== undefined){
                        for(var k = 0; k < pages.length; k++){
                            var pageHtml = '';
                            var rowHtml = '';
                            var rows = pages[k].rows;
                            if(rows.length > 0){
                                for(var i = 0; i < rows.length; i++){
                                    var row = rows[i];
                                    var columns = row.columns;
                                    var grid = row.grid.split(' ');
                                    var columnHtml = '';
                                    if(columns.length > 0) {
                                        for (var j = 0; j < columns.length; j++) {
                                            var column = columns[j];
                                            var data = column.data;
                                            var dataHtml = '';
                                            if(data.length > 0){
                                                for(var m = 0; m < data.length; m++){
                                                    var d = data[m];
                                                    RenderHtml.setParams(d);
                                                    dataHtml += RenderHtml.getByType(0)[d.html.tag];
                                                }
                                            }
                                            columnHtml += `\n\t\t<div class="col-md-${grid[j]}">\n\t\t\t${dataHtml}\n\t\t</div>`;
                                        }
                                    }
                                    rowHtml += `\n\t<div class="row">${columnHtml}\n\t</div>`;
                                }
                            }
                            pageHtml += `<div class="page-${k}">${rowHtml}\n</div>\n`;
                            fullHtml += pageHtml;
                        }
                    }
                    scope.content = fullHtml;
                }, true);
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