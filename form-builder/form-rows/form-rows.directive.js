(function(){
	angular.module('app')
	.directive('formRows', formRows);
	
	formRows.$inject = [];

	function formRows(){
		return {
			//transclude: true,
			restrict: "E",		
			templateUrl: 'form-builder/form-rows/form-rows.html',
			require: '^form-pages',
			controller: function($scope){
				var vmRow = this;
				vmRow.sortableRowBetweenPage = { 
					connectWith: '.connect-page-row', 
					placeholder: 'card border border-primary ui-placeholder-highlight' 
				};
			},
			controllerAs: 'vmRow'
		}	
	}
})();
