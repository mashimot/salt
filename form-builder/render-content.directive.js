(function(){
	angular.module('app')
	.directive('renderContent', renderContent);
	
	renderContent.$inject = [];

	function renderContent(){
		return {
			templateUrl: 'render-content.html',
			scope: {
				d: '=content'
			}
		}	
	}
})();
