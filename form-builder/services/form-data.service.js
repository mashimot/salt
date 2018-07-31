(function(){
    'use strict';
    angular.module('app').
    factory('formDataService', formDataService);
    formDataService.$inject = ['$http'];
    
    function formDataService($http){
    	var service = {
    		getFormData: getFormData
    	};
    	return service;

    	function getFormData(){
    		return {
      "rows": [
        {
          "grid": "12",
          "columns": [
            {
              "contents": [
                {
                  "html": {
                    "tag": "html",
                    "category": "html",
                    "data": "<h1 class=\"p-3 mb-3 bg-danger text-white text-center\">A simple drag & drop Bootstrap Form Builder </h1>"
                  },
                  "table": {}
                }
              ]
            }
          ]
        },
        {
          "grid": "3 9",
          "columns": [
            {
              "contents": [
                {
                  "html": {
                    "tag": "image",
                    "category": "html",
                    "src": "http://i.imgur.com/AVqsATi.gif"
                  },
                  "table": {}
                }
              ]
            },
            {
              "contents": [
                {
                  "html": {
                    "tag": "html",
                    "category": "html",
                    "data": "<p class=\"f3\">This project was made with Angular 1.7.2.</p>\n<p>It's been in development since December 2017 and is <strong>currently being developed.</strong></p>"
                  },
                  "table": {}
                }
              ]
            }
          ]
        }
      ],
      "name": "Salt - A tool for Lazy Developer"
    }
    	}
    }
})();