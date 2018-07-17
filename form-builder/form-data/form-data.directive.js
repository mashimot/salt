(function(){
	angular.module('app')
	.directive('formData', formData);
	
	formData.$inject = ['Logger'];

	function formData(Logger){
		return {
			restrict: 'E',
			require: '^form-columns',
			templateUrl: 'form-builder/form-data/form-data.html',
			controller: function($scope){
				var vmData = this;
				vmData.showOptions  	= -1;
				
                vmData.deleteData = function(column, dataIndex){
                    column.data.splice(dataIndex, 1);
                };
		        vmData.dataSortable = {
		            connectWith: '.connected-drop-target-sortable',
					placeholder: 'px-1 py-1 mt-1 bg-primary text-white ',
		            handle: '.data-handle',
					opacity: 0.3,
		            cancel: ".unsortable",
                    stop: function(event, ui){
                        Logger.success('Data successfully updated!');
                    }
		        };				
			},
			controllerAs: 'vmData',
            bindToController: true
		}	
	}
})();
