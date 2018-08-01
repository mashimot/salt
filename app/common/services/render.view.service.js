(function(){
	'use strict';

	angular.module('app')
		.service('renderView', renderView);
		renderView.$inject = ['$http', '$location'];

	function renderView($http, $location){
		//var url = "render-html.php"
		var url = 'http://devemetodo.unisa.br/teste';
		var service = {
			getView : getView,
			show	: show
		};

		function show(bigAssJson){
			return $http({
				method: 'GET',
				url: url + '/show',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				params: {
					bigAssJson: JSON.stringify(bigAssJson)
				}
			}).then(success)
			.catch(fail);

			function success(result, status, headers, config){
				//console.log(result);
				return result.data;

	        	//window.location = url + '/show';
            }

            function fail(result){
            	//return result;
            }
        }

		function getView(bigAssJson){
			return $http({
				method: 'POST',
				//url: 'render-html.php',
				url: url + '/getView',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				params: {
					bigAssJson: JSON.stringify(bigAssJson)
				}
			}).then(success)
			.catch(fail);

			function success(result, status, headers, config){
	        	//console.log(result);
	        	if(result.status === 200){
	        		return result.data;
	        	}
            }

            function fail(result){
            	//return result;
            }
        }

        return service;
	}
})();