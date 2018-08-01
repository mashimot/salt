(function() {
    'use strict';
    angular.module('collection.service', [])
        .service('CollectionService', function () {
            this.sortBy = function (key, reverse) {
                var moveSmaller = reverse ? 1 : -1;
                var moveLarger = reverse ? -1 : 1;

                /**
                 * @param  {*} a
                 * @param  {*} b
                 * @return {Number}
                 */
                return function (a, b) {
                    if (a[key] < b[key]) {
                        return moveSmaller;
                    }
                    if (a[key] > b[key]) {
                        return moveLarger;
                    }
                    return 0;
                };
            };
            this.getKeyAndValue = function (array) {
                var keys = [];
                var values = [];
                var tam = array.length;
                for (var i = 0; i < tam; i++) {
                    keys.push(i);
                    values.push(array[i]);
                }
                return {
                    keys: keys,
                    values: values
                }
            };
            this.createGroupedArray = function (arr, chunkSize) {
                var groups = [], i;
                for (i = 0; i < arr.length; i += chunkSize) {
                    groups.push(arr.slice(i, i + chunkSize));
                }
                return groups;
            };
        });
}());