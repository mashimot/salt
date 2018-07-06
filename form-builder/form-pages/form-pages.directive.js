(function(){
	angular.module('app')
	.directive('formPages', formPages);
	
	formPages.$inject = [];

	function formPages(){
		return {
			restrict: "E",			
			templateUrl: 'form-builder/form-pages/form-pages.html',
			scope: {
				data: '='
			},
			controller: function($scope){
				var vmPage = this;
				vmPage.data = $scope.data;

				vmPage.sortablePage = {
		            //placeholder: 'card border border-primary ui-placeholder-highlight',
		            placeholder: 'p-1 mb-1 bg-primary text-white'
	        	};

				vmPage.deletePage = function(index){
					vmPage.data.pages.splice(index, 1);
				}
			},
			controllerAs: 'vmPage'
		}	
	}
})();
