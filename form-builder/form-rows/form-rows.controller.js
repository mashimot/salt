(function(){
	angular.module('app')
	.controller('FormRowController', FormRowController);
	
	FormRowController.$inject = [];

	function FormRowController(Logger){
		var vmRow = this;
		
		vmRow.sortableRowBetweenPage = { 
			connectWith: '.connect-page-row', 
			placeholder: 'px-1 py-1 mt-1 bg-primary text-white',
			handle: '.row-handle',
			stop: function(){
                Logger.success('Row successfully updated!');
            }
		};
	}
})();

