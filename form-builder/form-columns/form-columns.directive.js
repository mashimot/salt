(function(){
	angular.module('app')
	.directive('formColumns', formColumns);

	formColumns.$inject = ['Logger'];

	function formColumns(Logger){
		return {
			//transclude: true,
			restrict: "E",
			require: '^form-rows',
			templateUrl: 'form-builder/form-columns/form-columns.html',
			controller: function($scope){
				var vmColumn 			= this;
				var vmPage 				= $scope.vmPage;
				vmColumn.showOptions  	= -1;
				vmColumn.data 			= $scope.data;

                vmColumn.deleteData = function(column, dataIndex){
                    column.data.splice(dataIndex, 1);
                };

		        vmColumn.dataSortable = {
		            connectWith: '.connected-drop-target-sortable',
		            //placeholder: 'card border border-primary ui-placeholder-highlight',
					placeholder: 'p-1 mb-1 bg-primary text-white',
		            handle: '.data-handle',
		            cancel: ".unsortable",
                    stop: function(event, ui){
                        Logger.success('Data successfully updated!');
                    }
		        };

		        vmColumn.columnSortable = {
		            placeholder: 'card border border-primary ui-placeholder-highlight',
		            //placeholder: 'card p-1 mb-1 bg-primary text-white',
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
			},
			controllerAs: 'vmColumn'
		}
	}
})();
