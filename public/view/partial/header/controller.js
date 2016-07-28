define(['settings'],function(settings){
	return ['$scope','$modal',function($scope,$modal){
		
		$scope.langs=settings.lang.langs;
		$scope.appInfo=settings.info;
		$scope.navi=settings.navi;
		
		$scope.about=function(){
			$modal.open({
				templateUrl:'/view/partial/header/dialog.html',
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
});
