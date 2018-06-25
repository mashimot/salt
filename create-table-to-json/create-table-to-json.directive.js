class CreateTableToJson {

    constructor(string = '', dbType = 'oracle'){
        this._string      = string;
        this._nullable     = false;
        this._isPrimaryKey= false;
        this._inputType   = '';
        this._labelName   = '';
        this._dataType    = '';
        this._size        = '';
        this._index       = 2;
        var dataBase      = this.getAllowedTypes()[dbType];
        if(dbType === 'mysql'){
            dataBase = {};
            angular.forEach(this.getAllowedTypes()[dbType], function(data, idx){
                angular.forEach(data, function(d, i){
                    dataBase[i] = d;
                });
            });
        }
        this._dataBase   = dataBase;
        this._data       = {
            name: '',
            pages: [],
            type: 'tab',
            errors: []
        };
    }
    getDataTypeAndSize(str){
        //var secondMatch = str[1].replace(/,/g, '');
        var RegexValBtwParen = /\(([^)]*)\)[^(]*$/;
        var secondMatch = str[1];
        //var RegexValBtwParen = /\((.*)\)/;
        var dataType, inputType, size = '';
        var hasValBtwParen = secondMatch.match(RegexValBtwParen);

        if (hasValBtwParen !== null) {
            dataType = secondMatch.replace(hasValBtwParen[0], '');
        } else {
            //(2) probably the next element -thirdMatch- must have(or not) the size of the columnName (it must be an integer or float)
            if (str.length > 2) { //has 2 elements
                var thirdMatch = str[2];
                hasValBtwParen = thirdMatch.match(RegexValBtwParen); //get value between parentheses
                if(hasValBtwParen !== null) // it goes to the next index if parentheses doesn't exists
                    this._index = 3;
            }
            //if doesn't contains, the second element of array will be the type
            dataType = secondMatch;
        }

        if(hasValBtwParen !== null){
            var n = hasValBtwParen[1];
            if(n.indexOf('.') !== -1 || n.indexOf(',') !== -1){
                if(!this.isFloat((n))){
                    this._data.errors.push({
                        message: `\`${this._name}\` must be a number!`
                    });
                }
            } else {
                if(!this.isInt((n))){
                    this._data.errors.push({
                        message: `\`${this._name}\` must be a number!`
                    });
                }
            }
            size = n;
        }

        var database  = this._dataBase[dataType.toUpperCase()];
        if (typeof database !== 'undefined' && dataType !== '') {
            inputType = database;
        } else {
            this._data.errors.push({
                message: `\`${dataType}\` does not exists! ${this._name}`
            });
        }
        this._dataType  = dataType;
        this._inputType = inputType;
        this._size      = size;
    }
    validateSyntax(str){
        var nullable = false;
        var isPrimaryKey = false;
        var value   = '';
        var allowed = {
            'not': {
                next: ['null'],
                previous: [],
                correct: 'not null'
            },
            'null': {
                next: [],
                previous: [],
                correct: 'null'
            },
            'primary': {
                next: ['key'],
                previous: [],
                correct: 'primary key'
            },
            'key': {
                next: [],
                previous: ['primary'],
                correct: 'primary key'
            }
        };

        for (var i = this._index; i < str.length; i++) {
            var currentStr = str[i].replace(/,/g , "");
            var hasError = false;
            var nextValue = '';
            var prevValue = '';
            if(typeof allowed[currentStr] === 'undefined'){
                this._data.errors.push({
                    message: 'You have an error in your SQL syntax: ' + this._name + ' - ' + currentStr
                });
            } else {
                var index = i + 1;
                if(i === str.length - 1){
                    index = str.length - 1;
                }
                var nextString = str[index];
                var prevString = str[i - 1];

                if(allowed[currentStr].next.length > 0){
                    if(nextString.indexOf(allowed[currentStr].next[0]) !== -1){
                    } else {
                        nextValue = allowed[currentStr].next[0];
                        hasError = true;
                    }
                }
                if(allowed[currentStr].previous.length > 0){
                    if(prevString.indexOf(allowed[currentStr].previous[0]) !== -1){
                    } else {
                        prevValue = allowed[currentStr].previous[0];
                        hasError = true;
                    }
                }
                value += `${prevValue} ${currentStr} ${nextValue}`;
                if(hasError && value !== ''){
                    this._data.errors.push({
                        message: `error: \`${currentStr}\` maybe \`${allowed[currentStr].correct}\` ? at line: ${this._name} `
                    });
                }
            }
        }
        value = value.replace(/\s\s+/g, ' ').trim();
        if(value.indexOf("not null") !== -1){
            nullable = true;
        }
        if(value.indexOf("primary key") !== -1){
            isPrimaryKey = true;
        }

        this._nullable = nullable;
        this._isPrimaryKey = isPrimaryKey;
        this._index = 2;
    }
    convert(){
        var data        = [];
        var split       = this._string.trim().split("\n");
        var sptlength   = split.length;
        var i = 0;

        while(i < sptlength && this._data.errors.length <= 0){
            var str = split[i].toLowerCase().replace(/\s\s+/g, ' ').trim().split(' ');
            if(str.length <= 1){
                this._data.errors.push({
                    message: `error`
                });
            } else {
                if(str[str.length - 1].indexOf(',') !== -1){
                    str[str.length - 1] = str[str.length - 1].replace(/,/g , "");
                }
                var firstMatch = str[0]; // columnName
                if (firstMatch === 'create' && str[1] === 'table') {
                    this._data.name = str[2];
                } else {
                    //the firstMatch  (str[0]) will be always the columnName
                    //the secondMatch (str[1]) will be always the data_type
                    this._name = firstMatch;
                    this.getDataTypeAndSize(str);
                    this.validateSyntax(str);
                    this.customInput();
                    this.customLabelName();
                    data.push({
                        html: {
                            category  : 'form',
                            tag       : this._inputType,
                            label     : this._labelName
                        },
                        table: {
                            isPrimaryKey: this._isPrimaryKey,
                            columnName: this._name,
                            type: this._dataType,
                            nullable: this._nullable,
                            size: this._size
                        }
                    });
                }
            }
            i++;
        }
        if(this._data.errors.length <= 0){
            var grid        = '3 4 5';
            var groups      = [];
            var arrGrid     = (grid).split(' ');
            var chunkSize   = arrGrid.length;
            var page = {
                rows: [],
                name: 'Page 1'
            };

            for (var i = 0; i < data.length; i += chunkSize) {
                groups.push(data.slice(i, i + chunkSize));
            }

            var newPage = groups.reduce(function(acc, group, index){
                var row = {
                    grid: grid,
                    columns: []
                };
                page.rows.push(row);
                group.map(function(data, i){
                    return page.rows[index].columns.push({
                        data: [data]
                    });
                }, 0);
                return page;
            }, 0);
            /*
            Another way to do the same thing from above
            for(var i = 0; i < groups.length ; i++){
                var g = groups[i];
                var row = {
                    grid: grid,
                    columns: []
                };
                page.rows.push(row);
                for(var j = 0; j < g.length; j++){
                    var data = g[j];
                    page.rows[i].columns.push({
                        data: [data]
                    });
                    this._data.pages[0] = page;
                }
            }*/
            this._data.pages[0] = newPage;

            var lastRow = this._data.pages[0].rows.length;
            var columns = this._data.pages[0].rows[lastRow - 1].columns;
            if(columns.length < chunkSize){
                for(var k = columns.length; k < chunkSize; k++){
                    this._data.pages[0].rows[lastRow - 1].columns.push({
                        data: []
                    })
                }
            }
        }
    }
    customLabelName(){
        var splitColumnName  = this._name.split('_');
        var labelName = {
            'dat' : 'Data',
            'qtd' : 'Quantidade',
            'cod' : 'Código',
            'dsc' : 'Descrição',
            'ind' : '',
            'usu' : 'Usuário',
            'tpo' : 'Tipo',
            'nom' : 'Nome',
            'est' : 'Estado',
            'acao': 'Ação',
            'psv' : 'Processo Seletivo',
            'per' : 'Porcentagem',
            'abv' : 'Abreviatura',
            'obs' : 'Observação',
            'num' : 'Número',
            'usuario': 'Usuário',
            'docto' : 'Documento',
            'doc' : 'Documento',
            'val': 'Valor',
            'sta': 'Status',
            'config': 'Configuração',
            'inicio': 'Ínicio',
            'termino': 'Término',
            'situacao': 'Situação',
            'nivel': 'Nível'
        };

        this._labelName = splitColumnName.map(function(currentPartialName, index){
            var value = labelName[currentPartialName];
            if(typeof value !== 'undefined')
                currentPartialName = value;

            return currentPartialName.charAt(0).toUpperCase() + currentPartialName.substr(1);
        }, 0).join(' ').trim();
    }
    customInput(){
        if(this._name.indexOf('ind_') !== -1)
            this._inputType = 'select';

        if(this._inputType === 'text' || this._inputType === 'textarea'){
            if(parseInt(this._size) <= 50)
                this._inputType = 'text';
            else
                this._inputType = 'textarea';
        }
    }
    getAllowedTypes(){
        return {
            //key = data_type. ex: type CHAR
            //value = input type of html. ex. <input type="text" />
            /*| key         | type
              | CHAR        | <input type="text" />
              | NUMBER      | <input type="number" />
              | TIMESTAMP   | <input type="text" class="datepicker"/> //from datepicker plugin
              | VARCHAR2    | <textarea></textarea>
              */
            "mysql": {
                integer:{
                     INT: 'TEXT',
                    SMALLINT: 'TEXT',
                    TINYINT: 'TEXT',
                    MEDIUMINT: 'TEXT',
                    BIGINT: 'TEXT'
                },
                real: {
                    FLOAT: 'TEXT',
                    DOUBLE: 'TEXT',
                    DECIMAL: 'TEXT'
                },
                text: {
                    CHAR: 'TEXT',
                    VARCHAR: 'TEXT',
                    /*TINYTEXT : {
                     mysql: 'TINYTEXT' ,
                     laravel: 'decimal'
                     },*/
                    TEXT: 'TEXT',
                    MEDIUMTEXT: 'TEXT',
                    LONGTEXT: 'TEXT'
                },
                binary: {
                    BINARY: 'TEXT'
                },
                temporal: {
                    DATE: 'TEXT',
                    TIME: 'TEXT',
                    DATETIME: 'TEXT',
                    TIMESTAMP: 'TEXT'
                }
            },
            /*"mysql": {
                "INT" : "number",
                "TINYINT" : "number",
                "VARCHAR2" : 'textarea',
                "VARCHAR" :  'textarea',
                "DATETIME" :  'date'
            },*/
            "oracle": {
                CHAR : 'text',
                NCHAR : 'text',
                VARCHAR2 : 'textarea',
                VARCHAR :  'textarea',
                NVARCHAR2 : 'textarea',
                INTEGER : 'text',
                /*CLOB : true,
                NCLOB : true,*/
                LONG : 'text',
                NUMBER : 'text',
                DATE : 'date',
                INTERVAL : 'text',
                TIMESTAMP : 'date'
            }
        };
    }
    getData(){
        return this._data;
    }
    getString(){
        return this._string;
    }
    isFloat(val) {
        var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
        if (!floatRegex.test(val))
            return false;

        val = parseFloat(val);
        if (isNaN(val))
            return false;
        return true;
    }

    isInt(val) {
        var intRegex = /^-?\d+$/;
        if (!intRegex.test(val))
            return false;

        var intVal = parseInt(val, 10);
        return parseFloat(val) == intVal && !isNaN(intVal);
    }
}

(function(){
	angular.module('app')
	.directive('createTableToJson', createTableToJson);
	
	createTableToJson.$inject = [];

	function createTableToJson(){
		return {
			templateUrl: 'create-table-to-json/create-table-to-json.html',
			scope: {
				data: '='
			},
			controller: controller,
			controllerAs: 'vm'
		};		
	}

	function controller($scope){
		var vm = this;
	    vm.data = $scope.data;
		vm.createTableString   = createTableString();
		vm.createTable         = createTable;

	    function createTable(string){
	        var createTableToJson = new CreateTableToJson(string, 'oracle');
	        createTableToJson.convert();
	        var data = createTableToJson.getData();
	        vm.errors = data.errors;
	        if(data.errors.length <= 0){
	            vm.data.pages.push({
	                rows: data.pages[0].rows,
	                name: data.pages[0].name
	            });
	        }
	    }		
	}

    function createTableString(){
        return `
    supplier_id number(10) NOT NULL,
  supplier_name varchar2(50) NOT NULL,
  address varchar2(50),
  city varchar2(50),
  state varchar2(25),
  dat_now date,
  zip_code varchar2(10)
`;
    }
})();
