class CreateTableToJson {
    constructor(string = '', dbType = 'oracle'){
        this._string        = string;
        this._nullable      = false;
        this._isPrimaryKey  = false;
        this._inputType     = '';
        this._columnName    = '';
        this._labelName     = '';
        this._dataType      = '';
        this._size          = '';
        this._index         = 2;
        this._data          = [];
        this._errors        = [];
        this._dataBase      = this.getAllowedTypes()[dbType];
        this._customLabel   = this.getCustomLabelName();
    }

    getDataTypeAndSize(str){
        //var secondMatch = str[1].replace(/,/g, '');
        var RegexValBtwParen =  '\\((.*)\\)';
        var secondMatch = str[1];
        var dataType, inputType, size = '';
        var hasValBtwParen = secondMatch.match(RegexValBtwParen);

        if (hasValBtwParen !== null) {
            dataType = secondMatch.replace(hasValBtwParen[0], '');
        } else {
            //(2) probably the next element -thirdMatch- must have(or not) the size of the columnName (it must be an integer or float)
            if (str.length > 2) { //has 2 elements
                var thirdMatch = str[2];
                if(thirdMatch.charAt(0) === '('){
                    hasValBtwParen = thirdMatch.match(RegexValBtwParen); //get value between parentheses
                    if(hasValBtwParen !== null) // it goes to the next index if parentheses doesn't exists
                        this._index = 3;
                }
            }
            //if doesn't contains, the second element of array will be the type
            dataType = secondMatch;
        }

        if(hasValBtwParen !== null){
            var n = hasValBtwParen[1];
            if(n.indexOf('.') !== -1 || n.indexOf(',') !== -1){
                if(!this.isFloat((n))){
                    this._errors.push({
                        message: `\`${this._columnName}\`: ${n} is not a number!`
                    });
                }
            } else {
                if(!this.isInt((n))){
                    this._errors.push({
                        message: `\`${this._columnName}\`: ${n} is not a number!`
                    });
                }
            }
            size = n;
        }

        var database  = this._dataBase[dataType.toUpperCase()];
        if (typeof database !== 'undefined' && dataType !== '') {
            inputType = database;
        } else {
            this._errors.push({
                message: `\`${dataType}\` does not exists! ${this._columnName}`
            });
        }
        this._dataType  = dataType;
        this._inputType = inputType;
        this._size      = size;
    }
    validateSyntax(stringArr){
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

        for (var i = this._index; i < stringArr.length; i++) {
            var currentStr = stringArr[i].replace(/,/g , "");
            var hasError = false;
            var nextValue = '';
            var prevValue = '';
            if(typeof allowed[currentStr] === 'undefined'){
                this._errors.push({
                    message: 'You have an error in your SQL syntax: ' + this._columnName + ' - ' + currentStr
                });
            } else {
                var index = i + 1;
                if(i === stringArr.length - 1){
                    index = stringArr.length - 1;
                }
                var nextString = stringArr[index];
                var prevString = stringArr[i - 1];

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
                    this._errors.push({
                        message: `error: \`${currentStr}\` maybe \`${allowed[currentStr].correct}\` ? at line: ${this._columnName} `
                    });
                }
            }
        }
        value = value.replace(/\s\s+/g, ' ').trim();
        this._nullable = (value.indexOf("not null") !== -1)? true : false;
        this._isPrimaryKey = (value.indexOf("primary key") !== -1)? true : false;
        this._index = 2;
    }
    convert(){
        var split = this._string.trim().split("\n");
        var i = 0;
        while(i < split.length && this._errors.length <= 0){
            var stringArr = split[i].toLowerCase().replace(/\s\s+/g, ' ').trim().split(' ');

            if(stringArr.length <= 1){
                this._errors.push({
                    message: `Incompleted`
                });
            } else {
                var lastStrIndex = stringArr.length - 1;
                stringArr[lastStrIndex] = stringArr[lastStrIndex].replace(/,/g , "");
                if(stringArr[lastStrIndex] === '' && stringArr[lastStrIndex].length <= 0)
                    stringArr.splice(lastStrIndex, 1);

                this._columnName = stringArr[0]; // columnName

                if (this._columnName === 'create' && stringArr[1] === 'table') {
                    this._data.name = stringArr[2];
                } else {
                    //the firstMatch  (stringArr[0]) will be always the columnName
                    //the secondMatch (stringArr[1]) will be always the data_type
                    this.getDataTypeAndSize(stringArr);
                    this.validateSyntax(stringArr);
                    this.customInput();
                    this.customLabelName();
                    this._data.push({
                        html: {
                            category  : 'form',
                            tag       : this._inputType,
                            label     : this._labelName
                        },
                        table: {
                            isPrimaryKey: this._isPrimaryKey,
                            columnName: this._columnName,
                            type: this._dataType,
                            nullable: this._nullable,
                            size: this._size
                        }
                    });
                }
            }
            i++;
        }
    }

    customLabelName(){
        var splitColumnName  = this._columnName.split('_');
        if(splitColumnName.length > 0){
            for(var i = 0; i < splitColumnName.length; i++){
                var currentPartialName = splitColumnName[i];
                var value = this._customLabel[currentPartialName];
                if(typeof value !== 'undefined')
                    currentPartialName = value;

                splitColumnName[i] = currentPartialName.charAt(0).toUpperCase() + currentPartialName.substr(1);
            }
            this._labelName = splitColumnName.join(' ').trim();;
        }
    }
    customInput(){
        if(this._columnName.indexOf('ind_') !== -1)
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
                //integer
                INT: 'TEXT',
                SMALLINT: 'TEXT',
                TINYINT: 'TEXT',
                MEDIUMINT: 'TEXT',
                BIGINT: 'TEXT',
                //real
                FLOAT: 'TEXT',
                DOUBLE: 'TEXT',
                DECIMAL: 'TEXT',
                //text
                CHAR: 'TEXT',
                VARCHAR: 'TEXT',
                TEXT: 'TEXT',
                MEDIUMTEXT: 'TEXT',
                LONGTEXT: 'TEXT',
                //binary
                BINARY: 'TEXT',
                //temporal
                DATE: 'TEXT',
                TIME: 'TEXT',
                DATETIME: 'TEXT',
                TIMESTAMP: 'TEXT'
            },
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
    getError(){
        return this._errors;
    }
    getCustomLabelName(){
        return {
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
    }
    hasError(){
        if(this._errors.length > 0)
            return true;
        return false;
    }
    isInt(val) {
        var intRegex = /^-?\d+$/;
        if (!intRegex.test(val))
            return false;

        var intVal = parseInt(val, 10);
        return parseFloat(val) == intVal && !isNaN(intVal);
    }
    isFloat(val) {
        var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
        if (!floatRegex.test(val))
            return false;

        val = parseFloat(val);
        if(isNaN(val))
            return false;
        return true;
    }
}

class BootstrapGridSystem{

    constructor(data = [], grid = '4 4 4'){
        this._data = data;
        this._grid = grid;
        this._page = [];
    }

    convert(){
        var groups      = [];
        var grid        = this._grid.replace(/ +/g, ' ').trim();
        var arrGrid     = grid.split(' ');

        var chunkSize   = arrGrid.length;
        var page = {
            rows: [],
            name: 'Page 1'
        };

        for (var i = 0; i < this._data.length; i += chunkSize) {
            groups.push(this._data.slice(i, i + chunkSize));
        }
        var count = -1;
        this._page = groups.reduce(function(acc, group, index){
            page.rows.push({
                grid: grid,
                columns: []
            });
            group.map(function(data, i){
                count++;
                return page.rows[index].columns.push({
                    contents: [data]
                });
            }, 0);
            return page;
        }, 0);
        var lastRow = this._page.rows.length;
        var columns = this._page.rows[lastRow - 1].columns;
        if(columns.length < chunkSize){
            for(var k = columns.length; k < chunkSize; k++){
                this._page.rows[lastRow - 1].columns.push({
                    contents: []
                })
            }
        }
    }
    getPage(){
        return this._page;
    }
}
(function(){
	angular.module('app')
	.directive('createTableToJson', createTableToJson);
	
	createTableToJson.$inject = ['Logger'];

	function createTableToJson(){
		return {
			templateUrl: 'create-table-to-json/create-table-to-json.html',
			scope: {
                pages: '='
			},
			controller: controller,
			controllerAs: 'vm',
            bindToController: true
		};		
	}

	function controller($scope, Logger){
		var vm = this;
	    vm.pages = $scope.pages;
        vm.grid = '4 4 4';
		vm.createTableString   = createTableString();
		vm.createTable         = createTable;
        vm.database            = ['oracle'/*, 'mysql'*/];
        vm.options             = {
            database: 'oracle'
        };

	    function createTable(string, isFormValid){
            vm.errors = [];
            if(isFormValid){
                var createTableToJson = new CreateTableToJson(string, vm.options.database);
                createTableToJson.convert();
                if(!createTableToJson.hasError()){
                    var data = createTableToJson.getData();
                    var bootstrapGrid = new BootstrapGridSystem(data, vm.grid);
                    bootstrapGrid.convert();
                    var page = bootstrapGrid.getPage();
                    vm.pages.push(page);
                    console.log(vm.pages);
                    Logger.success('New Data successfully created!');
                } else {
                    vm.errors = createTableToJson.getError();
                }                
            } else {
                Logger.error('Oops! please fill in all required fields!');
            }
	    }		
	}

    function createTableString(){
        return `supplier_id number(10) NOT NULL  ,
supplier_name varchar2(50) NOT NULL,
address varchar2(50),
city varchar2(50),
state varchar2(25),
dat_now date,
zip_code varchar2(10)
`;
    }
})();
