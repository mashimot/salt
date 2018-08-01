(function(){
	'use strict';
	angular.module('app').
	factory('DominioService', DominioService);
	DominioService.$inject = ['$http'];

	function DominioService($http){
		var url = "http://devemetodo.unisa.br/dominio/dominioAPI";
		var service = {
			getDominio: getDominio
		};

		return service;

		function getDominio(dscDominio){
			return $http.get(url + '/' + dscDominio)
			.then(success);
				//.catch(fail);

			function success(result, status, headers, config){
				console.log(result);
				return result;
			}
		}
	}
})();