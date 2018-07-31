(function(){
	angular.module('spell.checker', [])
		.directive('spellChecker', spellChecker)
		spellChecker.$inject = ['$uibModal', 'LanguageToolService'];
		
		function spellChecker($uibModal, LanguageToolService){
			return {
				restrict: 'EA',
                transclude: true,
				scope: {
					text: '='
				},				
				template: `
                <div class="input-group input-group">
                    <input type="text" type="search" ng-model="text" class="form-control">
                    <div class="input-group-append">
                        <button ng-click="checkSpelling()" class="btn btn-outline-info btn-sm" type="button">
                            <i class="fa fa-book" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
				`,
				controller: function($scope){
					$scope.checkSpelling = function(){
						var modalInstance = $uibModal.open({
							templateUrl: 'spell-checker/spell-checker.html',
							controller: SpellCheckerController,
							resolve: {
								text: function(){
									return $scope.text;
								}
							},
							backdrop : true,
							keyboard : true,
							backdropClick : true,
							size : 'lg',
							animation: false
						});
						modalInstance.result.then(function(result){
							$scope.text = result;
						});
					}
				} 
			}
		}

		function SpellCheckerController($scope, $uibModalInstance, text, LanguageToolService) {
            //$scope.text = text;
            $scope.result = [];
            $scope.text = {
            	value: text
            };

            spellChecker();

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

            $scope.spellChecker = spellChecker;

            $scope.save = function(text){
                $uibModalInstance.close($scope.text.value);
            };

            $scope.cancel = function() {
                $uibModalInstance.close();
            };

            function langTool(){
                var arrOfWords = $scope.text.value.split(' ');
                if(arrOfWords.length > 0){
                    var newText = [];
                    for(var i = 0; i < arrOfWords.length; i++){
                        var word = arrOfWords[i].trim()
                        word = word.charAt(0).toUpperCase() + word.slice(1);
                        newText.push(word);
                    }
                    var fullText = newText.join(' ');
                    return LanguageToolService.getCorrectWord(fullText);
                }
            }

            function spellChecker(){
                $scope.isLoading = true;
                if($scope.text.value.length > 0){
                    $scope.result = [];
                    var promiseArray = langTool();
                    promiseArray.then(function(r){
                        $scope.result.push(r);
                        $scope.text.value = r.text;
                        console.log($scope.text.value);
                        $scope.isLoading = false;
                    });
                } else {
                    $scope.isLoading = false;
                }
            }
        }		
}());
