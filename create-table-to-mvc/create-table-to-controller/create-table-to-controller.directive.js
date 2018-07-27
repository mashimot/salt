(function(){
    'use strict';
    angular.module('new.app')
    .directive('sqlToController', SqlToController);

    function SqlToController() {
        return {
            templateUrl: 'create-table-to-mvc/create-table-to-controller/controller.html',
            restrict: 'E',
            scope: {
                pages   : '=vmPages',
                controller: '='
            },
            link: link,
            controller: controller
        };

        function link(scope, element, attr){
            scope.validation = [];
            scope.controller = controller();
            scope.$watch('pages', function(pages) {
                var validation = '';
                var rules = '';
                var inputNiceNames = '';
                if (pages.length > 0 && pages.length !== undefined) {
                    for (var k = 0; k < pages.length; k++) {
                        var rows = pages[k].rows;
                        if (rows.length > 0) {
                            for (var i = 0; i < rows.length; i++) {
                                var columns = rows[i].columns;
                                if (columns.length > 0) {
                                    for (var j = 0; j < columns.length; j++) {
                                        var contents = columns[j].contents;
                                        if (contents.length > 0) {
                                            for (var m = 0; m < contents.length; m++) {
                                                var d = contents[m];
                                                if(d.table && Object.keys(d.table).length > 0) {
                                                    var name = d.table.columnName;
                                                    var nullable = d.table.nullable;
                                                    var size = d.table.size;
                                                    var dataType = d.table.type;
                                                    var labelName = d.html.label;
                                                    //var inputType = d.html.tag;
                                                    //var addComment  = '//';
                                                    var required = 'nullable';
                                                    var addComment = '';
                                                    var maxlength = '';
                                                    var isNumber = '';
                                                    var isDate = '';

                                                    if (size > 0) {
                                                        if (dataType === 'number') {
                                                            isNumber = '|numeric';
                                                            maxlength = '|digits_between:1,' + size;
                                                        } else {
                                                            maxlength = '|max:' + size;
                                                        }
                                                    }

                                                    if (dataType === 'date') {
                                                        isDate = '|date_format:"d/m/Y"';
                                                    }
                                                    //var maxlength = scope.data[i].size > 0? '|min:' + scope.data[i].size : '';
                                                    if (nullable) {
                                                        required = 'required';
                                                        addComment = '';
                                                    }

                                                    rules += `\t${addComment}'${name}' => '${required}${isDate}${isNumber}${maxlength}',\n`;

                                                    inputNiceNames += `\t'${name}' => '${labelName}',\n`;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                validation = `
                        $inputNiceNames = [
                            ${inputNiceNames}
                        ];   
                        $rules = [
                            ${rules}
                        ];
                    `;
                scope.validation = validation;
            }, true);
        }
        function controller(){
            return {
                name: 'Controller'
            };
        }        
    }
})();