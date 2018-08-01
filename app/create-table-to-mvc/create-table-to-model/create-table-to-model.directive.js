(function(){
    'use strict';
    
    angular.module('app')
        .directive('sqlToModel', SqlToModel);
        SqlToModel.$inject = ['$timeout'];

    function SqlToModel($timeout){
        return {
            templateUrl: 'create-table-to-mvc/create-table-to-model/model.html',
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
                var pk = [];
                var fillable = '';
                if(pages.length > 0 && pages.length !== undefined){
                    for(var k = 0; k < pages.length; k++){
                        var rows = pages[k].rows;
                        if(rows.length > 0){
                            for(var i = 0; i < rows.length; i++){
                                var columns = rows[i].columns;
                                if(columns.length > 0) {
                                    for (var j = 0; j < columns.length; j++) {
                                        var contents = columns[j].contents;
                                        if(contents.length > 0){
                                            for(var m = 0; m < contents.length; m++){
                                                var d = contents[m];
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
                }
                if(pk.length <= 0){
                    scope.model.sequenceName = '';
                }
                scope.model.primaryKey = pk;
                scope.model.fillable = fillable;
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