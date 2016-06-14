define(['settings'],function(settings){
	return ['$scope',function($scope){
		
		$scope.langs=settings.lang.langs;
		$scope.appInfo=settings.info;
		$scope.navi=settings.navi;
		
	}];
});
