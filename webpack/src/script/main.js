require([
	'boot',
	'router',
	'translater',
	'formValidator',
	'ui'
],function(
	boot,
	router,
	translater,
	formValidator,
	ui
){
	var app=boot.app;
	
	app.config([
		'$stateProvider',
		'$urlRouterProvider',
		'$locationProvider',
		'$controllerProvider',
		'$compileProvider',
		'$filterProvider',
		'$provide',
		'$translateProvider',
		'$translatePartialLoaderProvider',
		'$validationProvider',
		function(
			$stateProvider,
			$urlRouterProvider,
			$locationProvider,
			$controllerProvider,
			$compileProvider,
			$filterProvider,
			$provide,
			$translateProvider,
			$translatePartialLoaderProvider,
			$validationProvider
		){
			//为ng支持amd而配置
			app.controller = $controllerProvider.register;
			app.directive = $compileProvider.directive;
			app.filter = $filterProvider.register;
			app.factory = $provide.factory;
			app.service = $provide.service;
			app.provider = $provide.provider;
			app.value = $provide.value;
			app.constant = $provide.constant;
			app.decorator = $provide.decorator;
			//路由配置启动
			router.route($stateProvider,$urlRouterProvider,$locationProvider);
			//i18n
			translater.config($translateProvider,$translatePartialLoaderProvider);
			//表单验证
			formValidator.config($validationProvider);

		}
	]);

	app.run(['$rootScope',function($rootScope){
		
	}]);

	//主控制器
	app.controller('mainController',[
		'$scope','$state','$rootScope','$cookieStore','$translate','$translatePartialLoader',
		function($scope,$state,$rootScope,$cookieStore,$translate,$translatePartialLoader){
			var loader=ui.loader();
			
			//路由事件
			router.events($rootScope,loader);
			//i18n
			translater.init($translate,$cookieStore);
			translater.events($scope,$rootScope,$cookieStore,$translate,$translatePartialLoader);

		}
	]);

	return app;
});
