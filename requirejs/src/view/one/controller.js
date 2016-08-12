define(function(){
	return ['$scope','$stateParams',function($scope,$stateParams){
		
		$scope.transFiller={
			viewName:'view-one'
		};
		
		$scope.params=$stateParams
		
	}];
});
