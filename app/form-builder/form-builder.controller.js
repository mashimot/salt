
(function(){
    'use strict';
    angular.module('app')
        .controller('FormBuilderController', FormBuilderController);

    FormBuilderController.$inject = ['$scope', 'DominioService', 'HtmlElementsService', 'formDataService'];

    function FormBuilderController($scope, DominioService, HtmlElementsService, formDataService ){
        var vm = this;
        vm.preview             = '';
        vm.pages               = [];
        vm.pages.push(formDataService.getFormData());
        vm.loading             = false;
        vm.tags                = getTags();
        vm.tools               = HtmlElementsService.getHtmlElements();
        vm.dominio             = {
            error: {
                has: false,
                msg: ''
            },
            data: []
        };
        vm.buscaDominio        = buscaDominio;
        vm.database = database();

        function database(){
            var createTableToJson = new CreateTableToJson();
            return createTableToJson.getAllowedTypes()['oracle'];
        }

        function getTags(htmlElements){
            var tools  = HtmlElementsService.getHtmlElements();
            var tags = [];
            for(var i = 0; i < tools.length; i++){
                var tool = tools[i];
                var category = tool.html.category;
                if(category === 'form'){
                    tags.push(tool.html.tag);
                }
            }
            return tags;
        }

        function buscaDominio(columnName){
            if(columnName.length > 3 && typeof columnName !== 'undefined'){
                vm.loading = true;
                vm.dominio.error.has = false;
                vm.dominio.data = [];
                DominioService.getDominio(columnName).then(function(result){
                    if (result.data !== null && result.status === 200){
                        if(result.data.length > 0){
                            vm.dominio.data = result.data;
                        } else {
                            vm.dominio.error.has = true;
                            vm.dominio.error.msg = 'No data found!';
                        }
                    }
                    vm.loading = false;
                }).catch(function(result){
                    if(result.data === null){
                        vm.dominio.error.has = true;
                        vm.dominio.error.msg = 'An error occurred!';
                    }
                    vm.loading = false;
                });
            }
        }
    }
})();

