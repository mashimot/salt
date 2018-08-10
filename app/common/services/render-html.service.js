(function(){
    'use strict';

angular.module('app')
	.factory('RenderHtml', RenderHtml);
	RenderHtml.$inject = [];
	function RenderHtml(){

        var name = '';
        var nullable    = false;
        var labelName   = '';
        var inputType   = '';
        var fields      = [];
        var htmlData    = '';
        var imgSrc      = '';
        var text        = '';
        var elements    = [];

		var service = {
            render : render,
            setParams : setParams,
            get :  get
		};
		return service;

        function setParams(d){
            name        = typeof d.table.columnName === 'undefined'? '' : d.table.columnName;
            nullable    = typeof d.table.nullable === 'undefined'? '' : d.table.nullable;
            labelName   = typeof d.html.label === 'undefined'? '' : d.html.label;
            htmlData    = typeof d.html.data === 'undefined'? '' : d.html.data;
            imgSrc      = typeof d.html.src === 'undefined'? '' : d.html.src;
            inputType   = typeof d.html.tag === 'undefined'? '' : d.html.tag;
            text        = typeof d.html.text === 'undefined'? '' : d.html.text;
            fields      = typeof d.html.fields === 'undefined'? [] : d.html.fields;
            elements    = typeof d.html.elements === 'undefined'? [] : d.html.elements ;
        }

        function render(tblData, frameworkName){
            var partialView = '';
            var type = null;
            for(var i = 0; i < tblData.length; i++){
                var d = tblData[i];
                setParams(d);
                type = getByType(frameworkName);
                partialView += type[inputType];
            }
            return partialView;
        }

        function get(){
            var h = html();
            return h[inputType];
        }

        function html(){
            return {
                "html": `${htmlData}`,
                "legend": `<legend>${text}</legend>`,
                "h1": `<h1>${text}</h1>`,
                "h2": `<h2>${text}</h2>`,
                "h3": `<h3>${text}</h3>`,
                "h4": `<h4>${text}</h4>`,
                "h5": `<h5>${text}</h5>`,
                "h6": `<h6>${text}</h6>`,
                "table":
                   `<table class="table">
                        ${fields.map((field, key) => (`<tr>${Object.keys(fields[0]).map((f, k) => `<td>${field[f]}</td>`).join('')}</tr>`)).join('')}
                    </table>`,
                "image": `<img src="${imgSrc}" class="img-fluid">`,
                "textarea":
                    `
                    <!-- start ${name} -->
                    <div class="form-group" id="div_${name}">
                        <label for="txt_${name}">${labelName}</label>
                        <textarea class="form-control" name="${name}" id="txt_${name}"  ${ nullable? `` : `required` }></textarea>
                    </div>
                    <!-- end ${name} -->
                    ` 
                ,
                "select":
                    `
                    <!-- start ${name} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <select class="form-control" name="${name}" id="i_${name}"  ${ nullable? `` : `required` }>
                            <option value="">Selecione</option>
                            ${elements.map( element => `<option value="${element.value}">${element.text}</option>` ).join('')}
                        </select>
                    </div>
                    <!-- ${name} -->`
                ,
                "checkbox":
                    `
                    <!-- start ${name} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        ${elements.map( element => `<div class="checkbox"><label><input type="checkbox" name="${name}" value="${element.value}"> ${element.text}</label></div>`).join('')}
                    </div>
                    <!-- end ${name} -->`
                ,
                "radio":
                    `
                    <!-- start ${name} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        ${elements.map( element => `<div class="radio"><label><input type="radio" name="${name}" value="${element.value}"> ${element.text}</label></div>`).join('')}
                    </div>
                    <!-- end ${name} -->`
                ,                
                "text":
                    `
                    <!-- start ${name} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control" name="${name}" id="i_${name}" value=""  ${ nullable? `` : `required` }>
                    </div>                
                    <!-- end ${name} -->`
                ,
                "number": 
                    `
                    <!-- start ${name} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="number" class="form-control" name="${name}" id="i_${name}" value="" ${ nullable? `` : `required` }>
                    </div>                    
                    <!-- end ${name} -->`
                ,
                "date":
                   `
                    <!-- start ${name} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="date" class="form-control" name="${name}" id="i_${name}" value="" ${ nullable? `` : `required` }>
                    </div>
                    <!-- end ${name} -->`
            }
        }
        function vuejs(){
            return {
                "textarea":
                    `
                    <!-- INICIO ${name} -->
                        <div class="form-group ${colValue}" id="div_${name}">
                            <label for="i_${name}">${labelName}</label>
                            <textarea class="form-control" name='${name}' v-model="model.${name}" id="i_${name}"></textarea>
                            <span class="help text-danger" v-if="form.errors.has('${name}')" v-text="form.errors.get('${name}')"></span>
                        </div>
                    <!-- FIM ${name} -->
                    `
                ,
                "select":
                    `
                    <!-- INICIO ${name} -->
                    <div class="form-group ${colValue}" id="div_${name}">
                        <label for="s_${name}">${labelName}</label>
                        <select class="form-control" v-model="model.${name}" id="s_${name}">
                            <option value="">Selecione</option>
                            @foreach(dominios('${name}') as $dominio)
                                <option value="{{ $dominio->val_dominio_item }}">{{ $dominio->dsc_dominio_item }}</option>
                            @endforeach
                        </select>
                        <span class="help text-danger" v-if="form.errors.has('${name}')" v-text="form.errors.get('${name}')"></span>
                    </div>
                    <!-- FIM ${name} -->
                    `
                ,
                "text":
                    `
                    <!-- INICIO ${name} -->
                    <div class="form-group ${colValue}" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control" name='${name}' id="i_${name}" value="{{ old('${name}') }}" v-model="model.${name}">
                        <span class="help text-danger" v-if="form.errors.has('${name}')" v-text="form.errors.get('${name}')"></span>
                    </div>
                    <!-- FIM ${name} -->
                    `
                ,
                "number":
                    `
                    <!-- INICIO ${name} -->
                    <div class="form-group ${colValue}" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="number" class="form-control" name='${name}' id="i_${name}" value="{{ old('${name}') }}" v-model="model.${name}">
                        <span class="help text-danger" v-if="form.errors.has('${name}')" v-text="form.errors.get('${name}')"></span>
                    </div>
                    <!-- FIM ${name} -->
                    `
                ,
                "date":
                    `
                    <!-- INICIO ${name} -->
                    <div class="form-group ${colValue}" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control datepicker" name='${name}' id="i_${name}" value="{{ old('${name}') }}" v-model="model.${name}">
                        <span class="help text-danger" v-if="form.errors.has('${name}')" v-text="form.errors.get('${name}')"></span>
                    </div>
                    <!-- FIM ${name} -->
                    `
            }
        }

	}
})();
