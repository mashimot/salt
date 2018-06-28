(function(){
	angular.module('app')
	.directive('formRows', formRows);
	
	formRows.$inject = ['Logger'];

	function formRows(Logger){
		return {
			//transclude: true,
			restrict: "E",		
			templateUrl: 'form-builder/form-rows/form-rows.html',
			require: '^form-pages',
			controller: function($scope){
				var vmRow = this;
				vmRow.sortableRowBetweenPage = { 
					connectWith: '.connect-page-row', 
					placeholder: 'card border border-primary ui-placeholder-highlight',
					stop: function(){
                        Logger.success('Row successfully updated!');
                    }
				};
			},
			controllerAs: 'vmRow'
		}	
	}
})();
