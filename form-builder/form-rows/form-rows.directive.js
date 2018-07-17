(function(){
	angular.module('app')
	.directive('formRows', formRows);
	
	formRows.$inject = ['Logger'];

	function formRows(Logger){
		return {
			restrict: "E",		
			templateUrl: 'form-builder/form-rows/form-rows.html',
			require: '^form-pages',
			controller: function($scope){
				var vmRow = this;
				
				vmRow.sortableRowBetweenPage = { 
					connectWith: '.connect-page-row', 
					placeholder: 'px-1 py-1 mt-1 bg-primary text-white',
					handle: '.row-handle',
					stop: function(){
                        Logger.success('Row successfully updated!');
                    }
				};
			},
			controllerAs: 'vmRow',
            bindToController: true
		}	
	}
})();
