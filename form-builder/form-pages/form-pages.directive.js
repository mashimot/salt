(function(){
	angular.module('app')
	.directive('formPages', formPages);
	
	formPages.$inject = [];

	function formPages(){
		return {
			restrict: "E",			
			templateUrl: 'form-builder/form-pages/form-pages.html',
			scope: {
				pages: '=pages',
                renderHtml: '='
			},
			controller: 'FormPageController',
			controllerAs: 'vmPage',
            bindToController: true
		}	
	}
})();
