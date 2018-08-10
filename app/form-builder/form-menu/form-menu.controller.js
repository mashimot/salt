(function(){
	angular.module('app')
	.controller('FormMenuController', FormMenuController);
	
	FormMenuController.$inject = ['$scope', 'RenderHtml'];

	function FormMenuController($scope, RenderHtml){
	    var vmMenu = this;
        /*vmMenu.pages = $scope.pages;
        vmMenu.tools = $scope.tools;*/
        vmMenu.pageModel = pageModel()

        vmMenu.bootstrap = [{ "grid": "6 6", "columns": [] }];
        vmMenu.grids = getGrid();

        vmMenu.newFile = function(){
            vmMenu.pages = new Array();
        };

        vmMenu.newPage = function(){
            vmMenu.pages.push({rows: [], name: 'Page Name ' + (vmMenu.pages.length + 1) })
        };

        vmMenu.newPageSortable = {
            placeholder: 'card px-1 py-1 mb-1 bg-primary text-white',
            connectWith: '.connected-pages',
            update: function(event, ui){
                vmMenu.pageModel = angular.copy(pageModel());
            }
        };

        vmMenu.gridSortable = {
            connectWith: '.connected-bootstrap-grid',
            placeholder: 'card px-1 py-1 bg-primary text-white',
            update: function(event, ui){
                var oldModel = ui.item.sortable.model;
                var textWithoutExtraWhiteSpaces = oldModel.grid.replace(/ +/g, ' ').trim();
                var arrNumbers = textWithoutExtraWhiteSpaces.split(' ');
                var columns = [];
                if(arrNumbers.length > 0){
                    for(var i = 0; i < arrNumbers.length; i++ ){
                        columns.push({
                            contents: []
                        });
                    }
                    var updateModel = ui.item.sortable.model;
                    updateModel.grid = textWithoutExtraWhiteSpaces;
                    updateModel.columns = columns;
                }

                vmMenu.bootstrap = [{ "grid": "6 6", "columns": [] }];
            }
        };

        vmMenu.toolSortable = {
            connectWith: '.connected-drop-target-tool',
            placeholder: 'card px-1 py-1 mt-1 bg-primary text-white',
            handle: '.tool-handle',
            start: function(event, ui){
                ui.item.startHtml = ui.item.html();
                if(typeof ui.item.sortable.model.html.tag !== 'undefined') {
                    var model = ui.item.sortable.model;
                    RenderHtml.setParams(model);
                    var html = RenderHtml.get();
                    ui.item.removeClass().css("background-color", ""); 
                    ui.item.html("<div class='row'><div class='px-3 py-3 bg-white border border-primary' style='opacity: 0.9; width: 100%; color: black;'>" + html + "</div></div>");
                    ui.helper.css('width', '120%');
                }
            },
            stop: function(event, ui){
                vmMenu.tools = angular.copy(vmMenu.tools);
                var currentModel = ui.item.sortable.model;
                if(currentModel.html.category === 'form'){
                    var columnName = currentModel.table.columnName;
                    var uid = new Date().valueOf().toString(36);

                    if(typeof columnName === 'undefined' || columnName === ''){
                        currentModel.table.columnName = 'name' + uid;
                    }
                }
                ui.item.html(ui.item.startHtml);
            }
        };
	}

    function pageModel(){
        return [{
            rows: [], 
            name: 'Page Name '
        }];            
    }

    function getGrid(){
        return [{
            grid: '6 6',
            columns: []
        },{
            grid: '4 4 4',
            columns: []
        },{
            grid: '3 3 3 3',
            columns: []
        },{
            grid: '2 2 4 2 2',
            columns: []
        },{
            grid: '12',
            columns: []
        }];
    }    
})();

