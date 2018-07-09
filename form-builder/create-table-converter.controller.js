

(function(){
    'use strict';
    angular.module('new.app')
        .controller('CreateTableConverterController', CreateTableConverterController);

    CreateTableConverterController.$inject = ['$scope', '$q', '$uibModal', 'LanguageToolService', 'DominioService', 'HtmlElementsService', 'formDataService', 'renderView', 'Logger'];

    function CreateTableConverterController($scope, $q, $uibModal, LanguageToolService, DominioService, HtmlElementsService, formDataService, renderView, Logger){
        var vm = this;
        vm.editPageName        = {};
        vm.preview             = '';
        vm.rows                = [];
        vm.pages = [];
        vm.pages.push(formDataService.getFormData());
        //console.log(formDataService.getFormData());
        vm.loading             = false;
        vm.reverse             = true;
        vm.pageModel           = pageModel();
        vm.tags                = getTags();
        vm.tools               = HtmlElementsService.getHtmlElements();
        vm.dominio             = {
            error: {
                has: false,
                msg: ''
            },
            data: []
        };
        vm.corretorOrtografico = corretorOrtografico;
        vm.buscaDominio        = buscaDominio;
        vm.corretor            = corretor;
        vm.dbs = dbs();
        function dbs(){
            var createTableToJson = new CreateTableToJson();
            return createTableToJson.getAllowedTypes()['oracle'];
        }
        vm.sortBy = function(row, propertyName, reverse){
            if(row.data.length > 0){
                vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
                vm.propertyName = propertyName;
                row.data.sort(sortBy(vm.propertyName, vm.reverse));
            }
        };
        function pageModel(){
            return [{
                rows: [], 
                name: 'Page Name ' + (vm.pages.length + 1)
            }];            
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
        
        function sortBy(key, reverse) {
            var moveSmaller = reverse ? 1 : -1;
            var moveLarger = reverse ? -1 : 1;

            /**
             * @param  {*} a
             * @param  {*} b
             * @return {Number}
             */
            return function (a, b) {
                if (a[key] < b[key]) {
                    return moveSmaller;
                }
                if (a[key] > b[key]) {
                    return moveLarger;
                }
                return 0;
            };
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

        function corretor(){
            var arrOfTexts = [];
            for(var i = 0; i < vm.rows.data.length; i++){
                var text = vm.rows.data[i].labelName;
                arrOfTexts.push({
                    text: text,
                    index: i
                });
            }
            if(arrOfTexts.length > 0){
                var modalInstance = $uibModal.open({
                    templateUrl: 'dialog1.tmpl.html',
                    controller: DialogController,
                    resolve: {
                        arrOfTexts: function(){
                            return arrOfTexts;
                        }
                    },
                    backdrop : true,
                    keyboard : true,
                    backdropClick : true,
                    size : 'lg',
                    animation: false
                });
                modalInstance.result.then(function(result){
                    vm.rows.data[result.index].labelName = result.text;
                });
            }
        }

        function corretorOrtografico(text, index, ev){
            var arrOfTexts = [];
            arrOfTexts.push({
                text: text,
                index: index
            });
            var modalInstance = $uibModal.open({
                templateUrl: 'dialog1.tmpl.html',
                controller: DialogController,
                resolve: {
                    arrOfTexts: function(){
                        return arrOfTexts;
                    }
                },
                backdrop : true,
                keyboard : true,
                backdropClick : true,
                size : 'lg',
                animation: false
            });
            modalInstance.result.then(function(result){
                vm.rows.data[result.index].labelName = result.text;
            });
        }

        function removeExtraWhiteSpace(text){
            return text.replace(/\s\s+/g, ' ').trim();
        }

        function DialogController($scope, $uibModalInstance, arrOfTexts) {
            $scope.arrOfTexts = arrOfTexts;
            $scope.result = [];

            corretorOrtografico();

            $scope.newWord = function(res, index, newWord){
                res.text = newWord;
                var words = [];
                if(res.data.length > 0){
                    for(var i = 0; i < res.data.length; i++){
                        var word = res.data[i].word;
                        words.push(word);
                    }
                    res.text = words.join(' ');
                }
            };

            $scope.corretorOrtografico = corretorOrtografico;

            $scope.atualizar = function(result){
                $uibModalInstance.close(result);
            };

            $scope.cancel = function() {
                $uibModalInstance.close();
            };

            function langTool(objText){
                var arrOfWords = removeExtraWhiteSpace(objText.text).split(' ');
                if(arrOfWords.length > 0){
                    var newText = [];
                    for(var i = 0; i < arrOfWords.length; i++){
                        var word = arrOfWords[i].trim()
                        word = word.charAt(0).toUpperCase() + word.slice(1);
                        newText.push(word);
                    }
                    var fullText = newText.join(' ');
                    var index    = objText.index;
                    return LanguageToolService.getCorrectWord(fullText, index);
                }
            }
            function corretorOrtografico(){
                var arrOfTexts = $scope.arrOfTexts;
                $scope.isLoading = true;
                if($scope.result.length > 0){
                    arrOfTexts = [];
                    for(var j = 0; j < $scope.result.length; j++){
                        var text = $scope.result[j].text;
                        var index = $scope.result[j].index;
                        arrOfTexts.push({
                            text: text,
                            index: index
                        });
                    }
                    $scope.result = [];
                }
                if(arrOfTexts.length > 0){
                    for(var i = 0; i < arrOfTexts.length; i++){
                        var promiseArray = langTool(arrOfTexts[i]);
                        promiseArray.then(function(r){
                            $scope.result.push(r);
                            $scope.isLoading = false;
                        });
                    }
                } else {
                    $scope.isLoading = false;
                }
            }
        }

        function cloneData() {
            return vm.rows.data;
        }
    }
})();

