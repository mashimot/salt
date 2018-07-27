(function(){
	angular.module('app')
	.controller('FormColumnController', FormColumnController);
	
	FormColumnController.$inject = ['$scope'];

	function FormColumnController($scope){
		var vmColumn 			= this;
		var vmPage 				= $scope.vmPage;
		
        vmColumn.columnSortable = {
            placeholder: 'card px-1 py-1 mt-1 border border-primary ui-placeholder-highlight',
			handle: '.column-handle',
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
                if(grid !== newGrid){
                	vmPage.pages[pageNumber].rows[rowIndex].grid = newGrid;
                }
            },
            stop: function(event, ui){
                ui.placeholder.removeClass();
                Logger.success('Column successfully updated!');
            }
        };
	}
})();

