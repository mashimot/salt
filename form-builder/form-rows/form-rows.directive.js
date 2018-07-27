(function(){
	angular.module('app')
	.directive('formRows', formRows);
	
	formRows.$inject = ['Logger'];

	function formRows(Logger){
		return {
			restrict: "E",		
			templateUrl: 'form-builder/form-rows/form-rows.html',
			require: '^form-pages',
			controller: 'FormRowController',
			controllerAs: 'vmRow',
            bindToController: true
		}	
	}
})();
