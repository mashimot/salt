(function() {
    'use strict';
    angular.module('app')
        .service('TabService', function () {
            var tabs = {
                general: {
                    title: "General Configuration", template: '<general-tab content="content" form-name="editModal"></general-tab>'
                },
                choices: {
                    title: "Choices", template: '<choices-tab content="content" form-name="editModal"></choices-tab>'
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
                        tabs: [tabs.title]                        
                    },
                    'h2': {
                        tabs: [tabs.title]
                    },
                    'h3': {
                        tabs: [tabs.title]
                    },
                    'h4': {
                        tabs: [tabs.title]
                    },
                    'h5': {
                        tabs: [tabs.title]
                    },
                    'h6': {
                        tabs: [tabs.title]
                    },                    
                    'legend': {
                        tabs: [tabs.title]
                    },
                    'radio': {
                        tabs: [tabs.general, tabs.choices]
                    },                    
                    'checkbox': {
                        tabs: [tabs.general, tabs.choices]
                    },                    
                    'select': {
                        tabs: [tabs.general, tabs.choices]
                    },
                    'textarea': {
                        tabs: [tabs.general]
                    },
                    'text': {
                        tabs: [tabs.general]
                    },
                    'number': {
                        tabs: [tabs.general]
                    },                    
                    'date': {
                        tabs: [tabs.general]
                    },
                    'image': {
                        tabs: [tabs.img]
                    },
                    'html': {
                        tabs: [tabs.htmlEditor]
                    },
                    'table': {
                        tabs: [tabs.table]
                    },                    
                    'file': {
                        tabs: [tabs.general]
                    }
                };
            };
        });
}());