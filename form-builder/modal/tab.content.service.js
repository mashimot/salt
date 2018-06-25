(function() {
    'use strict';
    angular.module('app')
        .service('TabService', function () {
            var tabs = {
                general: {
                    title: "Configuração Geral", template: '<general-tab content="content" form-name="editModal"></general-tab>'
                },
                choices: {
                    title: "Escolhas", template: '<choices-tab content="content" form-name="editModal"></choices-tab>'
                },
                visibleIf: {
                    title: "Vísivel Se", template: '<hide-when-tab content="content"></hide-when-tab>'
                },
                htmlEditor: {
                    title: "Html Editor", template: '<html-editor content="content"></html-editor>'
                },
                title: {
                    title: "Title", template: '<title-tab content="content" form-name="editModal"></title-tab>'
                },
                table: {
                    title: "Table", template: '<table-builder content="content" form-name="editModal"></table-builder>'
                },
                img: {
                    title: "Image", template: '<img-tab content="content" form-name="editModal"></img-tab>'
                }
            };
            this.render = function () {
                return {
                    'h1': {
                        tabs: [tabs.title], //is an array
                        hide: [] //ng-hide
                    },
                    'legend': {
                        tabs: [tabs.title], //is an array
                        hide: [] //ng-hide
                    },
                    'radio': {
                        tabs: [tabs.general, tabs.choices], //is an array
                        hide: [] //ng-hide
                    },                    
                    'checkbox': {
                        tabs: [tabs.general, tabs.choices], //is an array
                        hide: [] //ng-hide
                    },
                    'select': {
                        tabs: [tabs.general, tabs.choices], //is an array
                        hide: [] //ng-hide
                    },
                    'textarea': {
                        tabs: [tabs.general], //is an array
                        hide: [] //ng-hide
                    },
                    'text': {
                        tabs: [tabs.general], //is an array
                        hide: [] //ng-hide
                    },
                    'date': {
                        tabs: [tabs.general], //is an array
                        hide: [] //ng-hide
                    },
                    'image': {
                        tabs: [tabs.img], //is an array
                        hide: [] //ng-hide
                    },
                    'html': {
                        tabs: [tabs.htmlEditor], //is an array
                        hide: [] //ng-hide
                    },
                    'table': {
                        tabs: [tabs.table], //is an array
                        hide: [] //ng-hide
                    },                    
                    'file': {
                        tabs: [tabs.general], //is an array
                        hide: [] //ng-hide
                    }
                };
            };
        });
}());