(function(){
	angular.module('app')
	.controller('FormContentController', FormContentController);
	
	FormContentController.$inject = [];

	function FormContentController(Logger){
		var vmContent = this;
		vmContent.showOptions = -1;

		vmContent.deleteContent = function(column, contentindex){
			column.contents.splice(contentindex, 1);
		};
		
		vmContent.contentSortable = {
			connectWith: '.connected-drop-target-sortable',
			placeholder: 'px-1 py-1 mt-1 bg-primary text-white ',
			handle: '.content-handle',
			opacity: 0.3,
			cancel: ".unsortable",
			stop: function(event, ui){
				Logger.success('Data successfully updated!');
			}
		};				
	}
})();

