define(['boot'],function(boot){
	var app=boot.app,
		path=boot.settings.path,
		viewPath=path.root+path.view;

	return ['$scope','$modal',function($scope,$modal){
		
		$scope.langs=boot.settings.lang.langs;
		$scope.appInfo=boot.settings.info;
		$scope.navi=boot.settings.navi;
		
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
});
