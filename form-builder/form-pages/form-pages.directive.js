(function(){
	angular.module('app')
	.directive('formPages', formPages);
	
	formPages.$inject = [];

	function formPages(){
		return {
			restrict: "E",			
			templateUrl: 'form-builder/form-pages/form-pages.html',
			scope: {
				pages: '=',
                teste: '='
			},
			controller: function($scope){
				var vmPage = this;
				vmPage.pages = $scope.pages;
                vmPage.teste = $scope.teste;

				vmPage.sortablePage = {
		            //placeholder: 'card border border-primary ui-placeholder-highlight',
		            placeholder: 'p-1 mb-1 bg-primary text-white',
					//handle: '.page-handle'
	        	};

				vmPage.deletePage = function(index){
                    vmPage.pages.splice(index, 1);
				}
			},
			controllerAs: 'vmPage'
		}	
	}
})();
