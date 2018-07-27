(function(){
    'use strict';

    angular.module('new.app')
        .directive('sqlToView', SqlToView);
      SqlToView.$inject = ['RenderHtml', 'renderView'];

      function SqlToView(RenderHtml, renderView){
        return {
            //templateUrl: templateUrl,
            /*template: `
            <div class="form-group">
                <div class="radio" ng-repeat="ff in frontEndFrameworks">
                    <label><input type="radio" name="front_end_framework" ng-model="frontEnd.selected" ng-value="ff"> {{ ff.name }}</label>
                </div>
            </div>
            <div ng-init="tplUrl = templateUrl()" ng-include="tplUrl"></div>`,*/
            templateUrl: 'create-table-to-mvc/create-table-to-view/view.html',
            restrict: 'E',
            scope: {
                pages      : '=vmPages',
                view       : '='
            },
            controller: controller,
            link: link
        };

        function controller($scope){
            $scope.content = '';
            $scope.view = view();
        }

        function link(scope, elem, attr){
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
                                        var contents = column.contents;
                                        var dataHtml = '';
                                        if(contents.length > 0){
                                            for(var m = 0; m < contents.length; m++){
                                                var d = contents[m];
                                                RenderHtml.setParams(d);
                                                dataHtml += "\n\t\t\t" + RenderHtml.getHtml()[d.html.tag];
                                            }
                                        }
                                        columnHtml += `\n\t\t<div class="col-md-${grid[j]}">${dataHtml}\n\t\t</div>`;
                                    }
                                }
                                rowHtml += `\n\t<div class="row">${columnHtml}\n\t</div>`;
                            }
                        }
                        pageHtml += `\n<section class="page-${k + 1}">${rowHtml}\n</section>`;
                        fullHtml += pageHtml;
                    }
                }
                scope.content = fullHtml;
            }, true);
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