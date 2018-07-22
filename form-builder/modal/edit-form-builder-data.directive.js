(function() {
    'use strict';
    angular.module('app')
        .directive('editFormBuilderData', editFormBuilderData);
    editFormBuilderData.$inject = ['$uibModal', 'TabService'];

    function editFormBuilderData($uibModal, TabService){
        return {
            restrict: 'EA',
            scope: {
                data: '=data',
                typeEvent: '@'
            },
            link: function(scope, elem, attr){
                elem.on("click", function(){
                    var render = TabService.render();
                    var tag = scope.data.html.tag;
                    scope.render = render[tag];
                    scope.content = scope.data;
                    console.log(scope.teste);
                    save(scope.data, scope.typeEvent).result.then(function(result){
                        if(result.success){
                            angular.copy(result.content, scope.data);
                        }
                    });
                });

                function save(content, typeEvent){
                    var render = TabService.render();
                    var tag = content.html.tag;
                    var tabToRender = render[tag];
                    if(typeof tabToRender !== 'undefined'){
                        var modalInstance = $uibModal.open({
                            //templateUrl: 'config-template.html',
                            template: template,
                            controller: ConfigModalController,
                            resolve: {
                                render: function(){
                                    return tabToRender;
                                },
                                data: function () {
                                    return content;
                                },
                                typeEvent: function () {
                                    return typeEvent;
                                }
                            },
                            backdrop : true,
                            keyboard : true,
                            backdropClick : true,
                            size : 'lg',
                            animation: false
                        });
                        return modalInstance;
                    }
                }
                
                function template(){
                    return `
        <div class="modal-header">
            <h1>Preview</h1>
        </div>
        <div class="modal-body">
            <div class="card">
                <div class="card-header">
                    <render-content data="content"></render-content>
                </div>
                <div class="card-body">
                    <form name="editModal" ng-submit="ok(editModal.$valid)" method="post">
                        <div ng-repeat="(i, tab) in render.tabs" class="py-2">
                            <h4 ng-bind="tab.title" class="px-3 py-2 bg-danger text-white"></h4>
                            <span bind-html-compile="tab.template"></span>
                        </div>
                        <button type="submit" class="btn btn-primary" >OK</button>
                        <button class="btn btn-warning" ng-click="cancel()">Cancel</button>                        
                    </form>
                </div>
            </div>
        </div>`;
                }

                function ConfigModalController($scope, $uibModalInstance, render, data, typeEvent) {
                    var isChanged       = false;
                    $scope.content      = angular.copy(data);
                    $scope.typeEvent    = typeEvent;
                    $scope.render       = render;
                    $scope.cancel       = cancel;
                    $scope.ok           = ok;

                    //look at TabService, hide some inputs
                    /*if(render.hide.length){
                        for(var i = 0; i < render.hide.length; i++){
                            $scope[render.hide[i]] = true;
                        }
                    }*/
                    //verifica se houve alguma atualiazação no model
                    $scope.$watch('content', function(newValue, oldValue) {
                        if(angular.equals(newValue, angular.copy(data))){
                            isChanged = false;
                        } else {
                            isChanged = true;
                        }
                    }, true);

                    //se houve atualização no model, faz o update; caso ao contrário fecha-se o modal.
                    function ok(isFormValid){
                        if(isChanged && isFormValid){
                            if($scope.typeEvent === 'edit')
                                updateContent();
                        }
                        if(!isChanged){
                            if($scope.typeEvent === 'edit'){
                                $uibModalInstance.dismiss();
                            }
                        }
                    }
                    
                    function cancel(){
                        $uibModalInstance.dismiss();
                    }

                    function updateContent(){
                        var newContent = $scope.content;
                        var update = {
                            success: true,
                            content: newContent
                        };
                        $uibModalInstance.close(update);
                    }
                }
            }
        }
    }
}());
