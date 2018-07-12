(function() {
    'use strict';
    angular.module('app')
        .directive('choicesTab', function(CollectionService){
            return {
                templateUrl: 'form-builder/modal/config/config.choices.html',
                scope: {
                    content: '=content',
                    formName: '=formName'
                },
                controller: function($scope){
                    if(typeof $scope.content.html.elements === 'undefined'){
                        $scope.content.html.elements = [];
                    }    
                                    
                    $scope.sortableElements = {
                        //handle: '.element-handle',
                        stop: function(){
                            $scope.sortType      = undefined;
                            $scope.sortReverse   = undefined;
                            $scope.text.string   = elementToString($scope.content.html.elements);
                        }
                    };
                },
                link: function (scope, element) {
                    scope.text          = {};
                    scope.removeContent = removeContent;
                    scope.addElement    = addElement;
                    scope.cloneThis     = cloneThis;
                    scope.orderBy       = orderBy;
                    scope.string        = string;
                    scope.text.string   = elementToString(scope.content.html.elements);
                    
                    scope.elementChanged = function(e){
                        scope.text.string = elementToString(e);
                    };

                    function addElement() {
                        scope.content.html.elements.push({
                            text: '',
                            value: ''
                        });
                    }

                    function string(e, s){
                        var string = s.split('\n');
                        if(string.length > 0) {
                            var newElements = [];
                            for (var i = 0; i < string.length; i++) {
                                var str = string[i];
                                var firstMatch = str;
                                var secondMatch = '';
                                if(str.indexOf('|') !== -1){
                                    var match = str.split('|');
                                    firstMatch = match[0];
                                    //var secondMatch = match[1];
                                    secondMatch = str.substring(firstMatch.length + 1); //return '' if '|' was not found
                                }
                                var element = {
                                    text: (typeof firstMatch !== 'undefined')? firstMatch : '',
                                    value: (typeof secondMatch !== 'undefined')? secondMatch : ''
                                };
                                newElements.push(element);
                            }
                            scope.content.html.elements = newElements;
                        }
                    }
                    
                    function removeContent($index) {
                        scope.content.html.elements.splice($index, 1);
                        scope.text.string = elementToString(scope.content.html.elements);
                    }

                    function orderBy(type){
                        if(scope.sortType !== type){
                            scope.sortReverse = true;
                        }
                        scope.sortReverse = !scope.sortReverse;
                        scope.sortType    = type;
                        var sort = CollectionService.sortBy(type, scope.sortReverse);
                        scope.content.html.elements.sort(sort);
                        scope.text.string = elementToString(scope.content.html.elements);
                    }

                    function cloneThis(name, elements){
                        var elementsLength = elements.length;
                        if(elementsLength > 0){
                            var cloneThisObjectName = (name === 'value')? 'text' : 'value';
                            for(var i = 0; i < elementsLength; i++){
                                elements[i][name] = elements[i][cloneThisObjectName];
                            }
                            scope.text.string = elementToString(scope.content.html.elements);
                        }
                    }

                }
            }

            function elementToString(e){
                var string = '';
                if(typeof e !== 'undefined'){
                    if(e.length > 0){
                        for(var i = 0; i < e.length; i++){
                            var str = e[i];
                            var pipe = (str.value === '')? '' : '|';
                            var element = {
                                text: typeof str.text !== 'undefined'? str.text : '',
                                value: typeof str.value !== 'undefined'? str.value : '',
                            };

                            string += (element.text + pipe + element.value) + (i === e.length - 1 ? '' : "\n");
                        }
                    }
                }
                return string;                                  
            }            
        });
}());
