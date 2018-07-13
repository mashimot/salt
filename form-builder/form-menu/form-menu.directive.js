(function(){
    angular.module('app')
        .directive('formMenu', formMenu);

    formMenu.$inject = [];

    function formMenu(){
        var directive = {
            restrict: "E",
            templateUrl: 'form-builder/form-menu/form-menu.html',
            scope: {
                pages: '=',
                tools: '=',
                pageModel: '=',
                containers: '=',
                renderHtml: '='
            },
            controller: controller,
            controllerAs: 'vmMenu'
        };
        return directive;
    }

    function controller($scope){
        var vmMenu = this;

        vmMenu.pages = $scope.pages;
        vmMenu.tools = $scope.tools;
        vmMenu.renderHtml = $scope.renderHtml;
        vmMenu.containers = $scope.containers;
        vmMenu.pageModel = $scope.pageModel;
        vmMenu.bootstrap = [{ "grid": "6 6", "columns": [] }];
        vmMenu.PreviewUrl = "";
        vmMenu.grids = getGrid();
        
        vmMenu.newFile = function(){
            vmMenu.pages = [];
        };
        vmMenu.newPage = function(){
            vmMenu.pages.push({rows: [], name: 'Page Name ' + (vmMenu.pages.length + 1) })
        };

        vmMenu.sortableNewPage = {
            //placeholder: 'card border border-primary ui-placeholder-highlight',
            placeholder: 'card p-1 mb-1 bg-primary text-white',
            connectWith: '.connected-pages',
            update: function(event, ui){                
                vmMenu.pageModel = angular.copy(vmMenu.pageModel);
            }
        };
        
        vmMenu.sortableContainers = {
            connectWith: '.connected-bootstrap-grid',
            //placeholder: 'card border border-danger ui-placeholder-highlight',
            placeholder: 'card p-1 mb-1 bg-primary text-white',
            update: function(event, ui){
                var oldModel = ui.item.sortable.model;
                var textWithoutExtraWhiteSpaces = oldModel.grid.replace(/ +/g, ' ').trim();
                var arrNumbers = textWithoutExtraWhiteSpaces.split(' ');
                var columns = [];
                if(arrNumbers.length > 0){
                    for(var i = 0; i < arrNumbers.length; i++ ){
                        columns.push({
                            data: []
                        });
                    }
                    var updateModel = ui.item.sortable.model;
                    updateModel.grid = textWithoutExtraWhiteSpaces;
                    updateModel.columns = columns;
                }

                vmMenu.containers = angular.copy(vmMenu.containers);
                vmMenu.bootstrap = [{ "grid": "6 6", "columns": [] }];
            }
        };

        vmMenu.toolSortable = {
            connectWith: '.connected-drop-target-tool',
            placeholder: 'card p-1 mb-1 bg-primary text-white',
            //placeholder: 'card border border-primary ui-placeholder-highlight',
            //handle: '.tool-handle',
            start: function(event, ui){
                console.log(ui.item.sortable.model);
                if(typeof ui.item.sortable.model.html !== 'undefined') {
                    var model = ui.item.sortable.model;
                    var newHtml = vmMenu.renderHtml;
                    newHtml.setParams(model);
                    var html = newHtml.getHtml();
                    ui.item.startHtml = ui.item.html();
                    ui.item.html("<div class='px-3 py-3 bg-white border border-primary' style='opacity: 0.9;'>" + html[model.html.tag] + "</div>");
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
