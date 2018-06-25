(function() {
    'use strict';
    angular.module('app')
        .directive('tableBuilder', function () {
            return {
                templateUrl: 'form-builder/modal/config/config.table-builder.html',
                scope: {
                    content: '=content',
                    formName: '=formName'
                },
                link: function (scope) {
                    scope.hasDuplicateName = false;
                    scope.duplicatedName = '';
                    
                    scope.joeysWorldTour = function(){
                        var fields = angular.copy(scope.content.html.fields);
                        if(fields.length > 0){
                            var currentKeys = Object.keys(fields[0]);
                            var newFields = [];
                            for(var j = 0; j < fields.length; j++){
                                var objValues = {};
                                for(var i = 0; i < currentKeys.length; i++){
                                    var key = currentKeys[i];
                                    objValues[key] = fields[j][key];
                                }
                                newFields.push(objValues);
                            }
                            scope.content.html.fields = newFields;

                        }
                    }

                    scope.verifyDuplicates = function(indexToIgnore, newKey){
                        var fields = angular.copy(scope.content.html.fields);

                        if(fields.length > 0){
                            var currentKeys = Object.keys(fields[0]);
                            if(currentKeys.length > 0){
                                for(var j = 0; j < currentKeys.length; j++){
                                    var cKey = currentKeys[j].replace(/ +/g, ' ').trim().toLowerCase();
                                    var nKey = newKey.replace(/ +/g, ' ').trim().toLowerCase();
                                    if(indexToIgnore !== j && cKey === nKey){
                                        scope.hasDuplicateName = true;
                                        scope.duplicatedName = currentKeys[j];
                                        return false;
                                    }
                                }                
                            }
                        }
                        scope.hasDuplicateName = false;
                    }

                    scope.newField = function(index, key, newKey){
                        console.log(index);
                        if(!scope.hasDuplicateName){
                            if(newKey !== undefined && newKey.trim() !== ''){
                                var fields = angular.copy(scope.content.html.fields);

                                if(fields.length > 0){
                                    for(var i = 0; i < fields.length; i++){
                                        var field = fields[i];
                                        fields[i][newKey] = field[key];
                                        delete fields[i][key];
                                    }
                                    var keysArr = Object.keys(fields[0]);
                                    var lastItem = keysArr[keysArr.length - 1];
                                    keysArr.splice(index, 0, lastItem);

                                    scope.content.html.fields = JSON.parse(JSON.stringify(fields, keysArr));
                                }         
                            }
                        }
                    }

                    scope.newLine = function(){
                        var keys = Object.keys(scope.content.html.fields[0]);
                        if(keys.length > 0){
                            var dataObj = new Object();
                            for(var i = 0; i < keys.length; i ++){
                                var key = keys[i];
                                dataObj[key] = '';
                            }
                            scope.content.html.fields.push(dataObj);
                        }
                    }

                    scope.newColumn = function(){
                        var fields = angular.copy(scope.content.html.fields);

                        if(fields.length > 0){
                            var lastIndex = Object.keys(fields[0]).length;
                            for(var i = 0; i < scope.content.html.fields.length; i++){
                                scope.content.html.fields[i]['row ' + (lastIndex + 1)] = '';
                            }
                        } else {
                            scope.content.html.fields.push({
                                'row 1': ''
                            });
                        }
                    }
                    
                    scope.deleteColumn = function(key){
                        var fields = angular.copy(scope.content.html.fields);

                        if(fields.length > 0){
                            var hasKey = false;
                            for(var i = 0; i < fields.length; i++){
                                var field = fields[i];
                                var currentKeys = Object.keys(field);
                                console.log(currentKeys);
                                if(currentKeys.length > 0){
                                    for(var j = 0; j < currentKeys.length; j++){
                                        if(currentKeys[j] === key){
                                            hasKey = true;
                                            delete scope.content.html.fields[i][key];
                                        }
                                    }                
                                }
                            }
                            field = angular.copy(scope.content.html.fields);
                            var firstField = Object.keys(field[0]).length;
                            if(hasKey && firstField <= 0){
                                scope.content.html.fields = [];
                            }
                        }
                    }

                    scope.deleteLine = function(fieldIndex){
                        scope.content.html.fields.splice(fieldIndex, 1);
                    }
                }
            }
        });
}());