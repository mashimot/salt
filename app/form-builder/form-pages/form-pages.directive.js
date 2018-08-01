(function(){
	angular.module('app')
	.directive('formPages', formPages);
	
	formPages.$inject = ['Logger', 'formDataService'];

	function formPages(Logger, formDataService){
		return {
			restrict: "E",			
			templateUrl: 'form-builder/form-pages/form-pages.html',
			scope: {
				pages: '='
			},
			controller: 'FormPageController',
			controllerAs: 'vmPage',
            bindToController: true
		}	
	}
})();
