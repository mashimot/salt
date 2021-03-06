(function(){
	angular.module('app')
	.directive('renderContent', renderContent);
	
	renderContent.$inject = ['RenderHtml'];

	function renderContent(RenderHtml){
		var isLoaded = false;
		var html = {};

		return {
			scope: {
				data: '=data'
			},
			template: `<span bind-html-compile="result()"></span>`,
			link: function(scope){
				scope.result = function(){
					var data = scope.data;
					RenderHtml.setParams(data);
					var result = RenderHtml.get();
					if(typeof result !== 'undefined'){
						var required = '';

                        var tag = "<span class='badge badge-primary'>" + data.html.tag + "</span>";
                        if(data.html.category === 'form'){
                            required = data.table.nullable? "<span class='badge badge-success'>required</span>" : "<span class='badge badge-danger'>not required</span>";
						}
						return  tag + ' ' + required + result;
					}
					return 'undefined';
				}
			}
		}	
	}
})();
