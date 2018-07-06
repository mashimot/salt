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
					placeholder: 'p-1 mb-1 bg-primary text-white',
					stop: function(){
                        Logger.success('Row successfully updated!');
                    }
				};
			},
			controllerAs: 'vmRow'
		}	
	}
})();
