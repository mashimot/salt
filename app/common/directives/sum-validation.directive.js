(function(){
    'use strict';
    angular.module('app')
        .directive('sumValidation', sumValidation);
    sumValidation.$inject = [];

    function sumValidation(){
        return  {
            require: 'ngModel',
            restrict: 'A',
            scope: {
              sumBeEqualTo: '='
            },
            link: link
        };
        function link(scope, element, attr, ngModel){
            ngModel.$validators.isSumEqualsTo = function(value) {
                var arrValues = value.replace(/ +/g, ' ').split(' ');
                if(arrValues.length > 0){
                    var sum = 0;
                    for(var i = 0; i < arrValues.length; i++){
                        var num = parseInt(arrValues[i]);
                        sum += num;
                    }
                    return (sum === scope.sumBeEqualTo);
                }
                return false;
            };
        }
    }
})();