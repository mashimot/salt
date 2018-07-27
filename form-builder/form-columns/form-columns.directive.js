(function(){
	angular.module('app')
	.directive('formColumns', formColumns);

	formColumns.$inject = ['Logger'];

	function formColumns(Logger){
		return {
			//transclude: true,
			restrict: "E",
			require: '^form-rows',
			templateUrl: 'form-builder/form-columns/form-columns.html',
			controller: 'FormColumnController',
			controllerAs: 'vmColumn',
            bindToController: true
		}
	}
})();
