// define(['boot'],function(boot){
(function(){
	return ['$rootScope','$scope','$modal',function($rootScope,$scope,$modal){
		var settings=$rootScope.settings,
			viewPath=settings.path.root+settings.path.view;

		$scope.langs=$rootScope.settings.lang.langs;
		$scope.appInfo=$rootScope.settings.info;
		$scope.navi=$rootScope.settings.navi;
		
		$scope.about=function(){
			$modal.open({
				templateUrl:viewPath+'/partial/header/dialog.html',
				controller:function($scope,$modalInstance){
					$scope.ok=function(){
						alert('ok!!!!');
						$modalInstance.close('done!');
					};
					$scope.cancel=function(){
						$modalInstance.dismiss('nothing!');
					};
					$modalInstance.result.then(function(result){
						alert('result:'+result);
					});
				}
			});
		};
		
	}];
}());
// });
