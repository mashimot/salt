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

				vmPage.deletePage = function(index){
					vmPage.data.pages.splice(index, 1);
				}
			},
			controllerAs: 'vmPage'
		}	
	}
})();
