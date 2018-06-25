(function(){
	'use strict';

	angular.module('app')
		.factory('LanguageToolService', LanguageToolService);
		LanguageToolService.$inject = ['$http'];
		//API RESTful - Language Tool

		function LanguageToolService($http){
			var url = "https://languagetool.org/api/v2/check";
			var language = 'pt-BR'
			
			var service = {
				getCorrectWord : getCorrectWord
			};
			
			function getCorrectWord(text, index){
	            return $http({
	            	method: 'GET',
	            	url: url,
	            	params: {
	            		language: language,
	            		text: text,
	            		index: index
	            	},
	            	cache: false,
           			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	            }).then(success)
				.catch(fail);

	            function success(result, status, headers, config){
	            	//console.log(result);
	            	if(result.status === 200){
	            		var matches = result.data.matches;
	            		var text 	= result.config.params.text;
	            		var index 	= result.config.params.index;
	            		return {
	            			text: text,
	            			index: index,
	            			langTool: {
	            				matches: matches
	            			}
	            		};
	            	}
	            }

	            function fail(result){
	            	//return result;
	            }
			}
			return service;
		}
})();