(function(){
    'use strict';

angular.module('app')
	.factory('RenderHtml', RenderHtml);
	RenderHtml.$inject = [];
	function RenderHtml(){

        var name        = '';
        var toUpperName = '';
        var nullable     = false;
        var labelName   = '';
        var inputType   = '';
        var elements    = [];

		var service = {
            render : render,
            setParams : setParams,
            getByType : getByType
		};
		return service;

        function setParams(d){
        	name        = d.table.columnName;
            nullable     = d.table.nullable;
            toUpperName = name.toUpperCase();
        	labelName   = d.html.label;
        	inputType   = d.html.tag;
            elements    = d.html.elements;
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

		function getByType(type){
            switch(type){
                case 0:
                    return _default();
                case 1:
                    return laravel();
                break; 
                default: 
                    return false;
                break;
            }
		}
        function _default(){

            return {
                "textarea": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group" id="div_${name}">
                        <label for="txt_${name}">${labelName}</label>
                        <textarea class="form-control" name="${name}" id="txt_${name}" disabled ${ nullable? `` : `required` }></textarea>
                    </div>                   
                    <!-- FIM ${toUpperName} -->
                    ` 
                ,
                "select":  
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <select class="form-control" name="${name}" id="i_${name}" disabled ${ nullable? `` : `required` }>
                            <option value="">Selecione</option>
                            ${elements.map( element => `<option value="${element.value}">${element.text}</option>` ).join('')}
                        </select>
                    </div>                    
                    <!-- FIM ${toUpperName} -->
                    `
                ,
                "checkbox": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        ${elements.map( element => `<div class="checkbox"><label><input type="checkbox" name="${name}" value="${element.value}"> ${element.text}</label></div>`).join('')}
                    </div>
                    <!-- FIM ${toUpperName} -->
                    `
                ,
                "radio": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        ${elements.map( element => `<div class="radio"><label><input type="radio" name="${name}" value="${element.value}"> ${element.text}</label></div>`).join('')}
                    </div>
                    <!-- FIM ${toUpperName} -->
                    `
                ,                
                "text": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control" name="${name}" id="i_${name}" value="" readonly ${ nullable? `` : `required` }>
                    </div>                
                    <!-- FIM ${toUpperName} -->
                    `
                ,
                "number": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control number" name="${name}" id="i_${name}" value="" readonly ${ nullable? `` : `required` }>
                    </div>                    
                    <!-- FIM ${toUpperName} -->
                    `
                ,
                "date": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control date" name="${name}" id="i_${name}" value="" readonly ${ nullable? `` : `required` }>
                    </div>
                    <!-- FIM ${toUpperName} -->
                    `
            }
        }

        function laravel(){

            return {
                "textarea": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group ${colValue} {{ $errors->has('${name}') ? 'has-error' : '' }}" id="div_${name}">
                        <label for="txt_${name}">${labelName}</label>
                        <textarea class="form-control" name="${name}" id="txt_${name}" disabled>{{ (old('${name}') != null) ? old('${name}') : '$formulario->${name}' }}</textarea>
                    </div>                   
                    <!-- FIM ${toUpperName} -->
                    ` 
                ,
                "select":  
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group ${colValue} {{ $errors->has('${name}') ? 'has-error' : '' }}" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <select class="form-control" name="${name}" id="i_${name}" disabled required>
                            <option value="">Selecione</option>
                            ${complemento}
                        </select>
                    </div>                    
                    <!-- FIM ${toUpperName} -->
                    `
                ,
                "text": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group ${colValue} {{ $errors->has('${name}') ? 'has-error' : '' }}" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control" name="${name}" id="i_${name}" value="{{ (old('${name}') != null) ? old('${name}') : '$tipodoc->${name}' }}" readonly required>
                    </div>                
                    <!-- FIM ${toUpperName} -->
                    `
                ,
                "number": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group ${colValue} {{ $errors->has('${name}') ? 'has-error' : '' }}" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control number" name="${name}" id="i_${name}" value="{{ (old('${name}') != null) ? old('${name}') : '$tipodoc->${name}' }}" readonly required>
                    </div>                    
                    <!-- FIM ${toUpperName} -->
                    `
                ,
                "date": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group ${colValue} {{ $errors->has('${name}') ? 'has-error' : '' }}" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control date" name="${name}" id="i_${name}" value="{{ (old('${name}') != null) ? old('${name}') : '$tipodoc->${name}' }}" readonly required>
                    </div>
                    <!-- FIM ${toUpperName} -->
                    `
            }
        }
        function vuejs(){
            return {
                "textarea": 
                    `
                    <!-- INICIO ${toUpperName} -->
                        <div class="form-group ${colValue}" id="div_${name}">
                            <label for="i_${name}">${labelName}</label>
                            <textarea class="form-control" name='${name}' v-model="model.${name}" id="i_${name}"></textarea>
                            <span class="help text-danger" v-if="form.errors.has('${name}')" v-text="form.errors.get('${name}')"></span>
                        </div>
                    <!-- FIM ${toUpperName} -->
                    ` 
                ,
                "select":  
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group ${colValue}" id="div_${name}">
                        <label for="s_${name}">${labelName}</label>
                        <select class="form-control" v-model="model.${name}" id="s_${name}">
                            <option value="">Selecione</option>
                            @foreach(dominios('${toUpperName}') as $dominio)
                                <option value="{{ $dominio->val_dominio_item }}">{{ $dominio->dsc_dominio_item }}</option>
                            @endforeach
                        </select>
                        <span class="help text-danger" v-if="form.errors.has('${name}')" v-text="form.errors.get('${name}')"></span>
                    </div>
                    <!-- FIM ${toUpperName} -->
                    `
                ,
                "text": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group ${colValue}" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control" name='${name}' id="i_${name}" value="{{ old('${name}') }}" v-model="model.${name}">
                        <span class="help text-danger" v-if="form.errors.has('${name}')" v-text="form.errors.get('${name}')"></span>
                    </div>
                    <!-- FIM ${toUpperName} -->
                    `
                ,
                "number": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group ${colValue}" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="number" class="form-control" name='${name}' id="i_${name}" value="{{ old('${name}') }}" v-model="model.${name}">
                        <span class="help text-danger" v-if="form.errors.has('${name}')" v-text="form.errors.get('${name}')"></span>
                    </div>
                    <!-- FIM ${toUpperName} -->
                    `
                ,
                "date": 
                    `
                    <!-- INICIO ${toUpperName} -->
                    <div class="form-group ${colValue}" id="div_${name}">
                        <label for="i_${name}">${labelName}</label>
                        <input type="text" class="form-control datepicker" name='${name}' id="i_${name}" value="{{ old('${name}') }}" v-model="model.${name}">
                        <span class="help text-danger" v-if="form.errors.has('${name}')" v-text="form.errors.get('${name}')"></span>
                    </div>
                    <!-- FIM ${toUpperName} -->
                    `
            }
        }

	}
})();
