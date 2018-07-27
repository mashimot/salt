(function(){
	angular.module('app')
	.directive('formData', formData);
	
	formData.$inject = [];

	function formData(){
		return {
			restrict: 'E',
			require: '^form-columns',
			templateUrl: 'form-builder/form-contents/form-contents.html',
			controller: 'FormContentController',
			controllerAs: 'vmContent',
            bindToController: true
		}	
	}
})();
