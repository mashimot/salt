(function(){
	angular.module('app')
	.controller('FormPageController', FormPageController);
	
	FormPageController.$inject = [];

	function FormPageController(Logger){
		var vmPage = this;
		
		vmPage.sortablePage = {
            //placeholder: 'card border border-primary ui-placeholder-highlight',
            placeholder: 'px-1 py-1 mb-1 bg-primary text-white',
			//handle: '.page-handle'
    	};

		vmPage.deletePage = function(index){
            vmPage.pages.splice(index, 1);
		}
	}
})();

