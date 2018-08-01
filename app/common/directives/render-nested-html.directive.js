(function(){
    'use strict';
    
    angular.module('render.nested.html', [])
    .directive('renderNestedHtml', renderNestedHtml);
    function renderNestedHtml() {
        return {
            compile: function(element, attrs) {
                var rawHtml = element[0].innerHTML;
                var code = angular.element('<pre></pre>');

                code.text(rawHtml);
                element.replaceWith(code);
            }
        }
    }
})();