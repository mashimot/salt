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
  "pages": [
    {
      "rows": [
        {
          "grid": "12",
          "columns": [
            {
              "data": [
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
              "data": [
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
              "data": [
                {
                  "html": {
                    "tag": "html",
                    "category": "html",
                    "data": "<p class=\"f3\">This project was made with Angular 1.7.0.</p>\n<p>It's been in development since Dezember 2017 and is <strong>currently being developed.</strong></p>"
                  },
                  "table": {}
                }
              ]
            }
          ]
        }
      ],
      "name": "Salt - A tool for Lazy Developer"
    },
    {
      "rows": [
        {
          "grid": "4 4 4",
          "columns": [
            {
              "data": [
                {
                  "html": {
                    "tag": "html",
                    "category": "html",
                    "data": "<div class=\"text-center\"><a href=\"https://github.com/mashimot\" class=\"hvr-grow hvr-float-shadow \" target=\"_blank\"><i class=\"fab fa-github fa-10x text-dark\"></i></a></div>"
                  },
                  "table": {}
                }
              ]
            },
            {
              "data": [
                {
                  "html": {
                    "tag": "html",
                    "category": "html",
                    "data": "<div class=\"text-center\"><a href=\"https://www.linkedin.com/in/daniel-hashimoto-b724b314a/\" target=\"_blank\" class=\"hvr-grow hvr-float-shadow\"><i class=\"fab fa-linkedin fa-10x text-info\"></i></a></div>"
                  },
                  "table": {}
                }
              ]
            },
            {
              "data": [
                {
                  "html": {
                    "tag": "html",
                    "category": "html",
                    "data": "<div class=\"text-center\"><a href=\"https://www.facebook.com/linkhashimoto\" target=\"_blank\" class=\"hvr-grow hvr-float-shadow\"><i class=\"fab fa-facebook-f fa-10x text-primary\"></i></a></div>"
                  },
                  "table": {}
                }
              ]
            }
          ]
        }
      ],
      "name": "My Social Media"
    }
  ],
  "type": "tab"
};
    	}
    }
})();