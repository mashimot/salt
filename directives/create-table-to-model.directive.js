(function(){
    'use strict';
    
    angular.module('new.app')
        .directive('sqlToModel', SqlToModel);
        SqlToModel.$inject = ['$timeout'];

    function SqlToModel($timeout){
        return {
            //templateUrl: 'tpl-model',
            templateUrl: 'template/model/laravel.html',
            restrict: 'E',
            scope: {
                pages   : '=vmPages',
                model   : '='
            },
            link: link,
            controller: controller
        };
        function controller($scope){
            $scope.model = model();
            $scope.model.name = '$scope.table.name';
            $scope.model.tableName = '$scope.table.name';
        }
        function link(scope, element, attr){
            scope.$watch('pages', function(pages){
                if(pages.length > 0 && pages.length !== undefined){
                    var pk = [];
                    var fillable = '';
                    for(var k = 0; k < pages.length; k++){
                        var rows = pages[k].rows;
                        if(rows.length > 0){
                            for(var i = 0; i < rows.length; i++){
                                var columns = rows[i].columns;
                                if(columns.length > 0) {
                                    for (var j = 0; j < columns.length; j++) {
                                        var data = columns[j].data;
                                        if(data.length > 0){
                                            for(var m = 0; m < data.length; m++){
                                                var d = data[m];
                                                if(d.table && Object.keys(d.table).length > 0) {
                                                    var addComment = '';
                                                    var columnName = d.table.columnName;
                                                    var isPrimaryKey = d.table.isPrimaryKey;
                                                    //var nullable = d.table.nullable;
                                                    /*if(nullable){
                                                        addComment = '';
                                                    }*/
                                                    fillable += '\n\t' + addComment + '\'' + columnName + '\',';
                                                    if (isPrimaryKey !== undefined && isPrimaryKey) {
                                                        pk.push(columnName);
                                                        scope.model.sequenceName = 'sga_' + columnName + '_seq';
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(pk.length <= 0){
                        scope.model.sequenceName = '';
                    }                    
                    scope.model.primaryKey = pk;
                    scope.model.fillable = fillable;
                }
            }, true);
        }
        function model(){
            return {
                primaryKey: [],
                sequenceName: '',
                name: '',
                tableName: '',
                listNames: []
            };
        }        
    }
})();