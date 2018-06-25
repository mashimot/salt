(function(){
	angular.module('app')
	.directive('formColumns', formColumns);
	
	formColumns.$inject = [];

	function formColumns(){
		return {
			//transclude: true,
			restrict: "E",
			require: '^form-rows',
			templateUrl: 'form-builder/form-columns/form-columns.html',
			controller: function($scope){			
				var vmColumn 	= this;
				var vmPage 		= $scope.vmPage; 
				vmColumn.data 	= $scope.data;
					
		        vmColumn.sortableOptions = {
		            connectWith: '.connected-drop-target-sortable',
		            placeholder: 'card border border-primary ui-placeholder-highlight',
		            handle: '.handle',
		            cancel: ".unsortable"
		        };

		        vmColumn.columnSortable = {
		            placeholder: 'card border border-primary ui-placeholder-highlight',
		            start: function(event, ui){
		                ui.placeholder.addClass(ui.item.attr("class"));
		            },
		            update: function(event, ui){
		                var s           = ui.item.sortable;
		                var n_pos       = s.dropindex;
		                var o_pos       = s.index;
		                var grid        = event.target.attributes['data-bootstrap-grid'].nodeValue.trim();   
		                var rowIndex    = event.target.attributes['data-row-index'].nodeValue;   
		                var pageNumber  = event.target.attributes['data-page-number'].nodeValue;                   
		                var arrGrid     = grid.split(' ');
		                var aux1        = arrGrid[n_pos];
		                var aux2        = arrGrid[o_pos];
		                arrGrid[n_pos]  = aux2;
		                arrGrid[o_pos]  = aux1;

		                var newGrid = arrGrid.join(' ');
		                console.log(newGrid);
		                if(grid != newGrid){
		                	vmPage.data.pages[pageNumber].rows[rowIndex].grid = newGrid;
		                }
		            },
		            stop: function(event, ui){
		                ui.placeholder.removeClass();
		            }
		        };			        
			},
			controllerAs: 'vmColumn'
		}	
	}
})();
