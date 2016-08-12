define(['require','boot','ui'],function(require,boot,ui){
	var app=boot.app,
		path=boot.settings.path,
		viewPath=path.root+path.view;
	
	//路由配置
	function route(stateProvider,urlRouterProvider,locationProvider){
		//是否以 pushState 方式来进行路由
		locationProvider.html5Mode(false);

		var controllerRequire=function (controllerName,controllerFile) {
				if(!controllerFile){
					return;
				}
				return ['$q','$rootScope',function ($q, $rootScope) {
					var deferred = $q.defer();
					require([controllerFile], function (controller) {
						app.controller(controllerName, controller);
						$rootScope.$apply(deferred.resolve);
						app.debug.log('[ROUTER] '+controllerName+' registed!');
					});
					return deferred.promise;
				}];
			},
			controllerRegister=function(controllerName,transPartName){
				return ['$state','$translatePartialLoader',function($state,$translatePartialLoader){
					app.debug.log('[ROUTER] '+controllerName+' registed!');
					
					$translatePartialLoader.addPart(transPartName);
					return controllerName;
				}];
			};
		
		//routes
		stateProvider.state('index',{
			url:'/',
			abstract: true,
			views:{
				'header':{
					templateUrl:viewPath+'/partial/header/view.html',
					resolve:{
						controller:controllerRequire('headerController',viewPath+'/partial/header/controller.js')
					},
					controllerProvider:controllerRegister('headerController','partial/header')
				},
				'body':{
					templateUrl:viewPath+'/partial/body/view.html'
				},
				'footer':{
					templateUrl:viewPath+'/partial/footer/view.html'
				}
			}
		}).state('index.one',{
			url:'^/one?{id:[0-9]}{name}',
			views:{
				'content@index':{//viewname@statename
					templateUrl:viewPath+'/one/view.html',
					resolve:{
						controller:controllerRequire('oneController',viewPath+'/one/controller.js')
					},
					controllerProvider:controllerRegister('oneController','one')
				}
			}
		}).state('index.two',{
			url:'^/two',
			views:{
				'content@index':{
					templateUrl:viewPath+'/two/view.html',
					resolve:{
						controller:controllerRequire('twoController',viewPath+'/two/controller.js')
					},
					controllerProvider:controllerRegister('twoController','two')
				}
			}
		});
		

		//其他跳转
		urlRouterProvider.when('/','^/one');
		urlRouterProvider.otherwise('/one');


	}
	
	//路由事件
	function events(rootScope,loader){
		rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState,fromParams){
			loader.show();
			app.debug.info('[ROUTER] route to "'+toState.name+'"...');
		});
		rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
			app.debug.log('[ROUTER] route to "'+toState.name+'" success!');
		});
		rootScope.$on('$stateChangeError',function(){
			app.debug.error('route failed!');
		});
		rootScope.$on('$viewContentLoaded',function(event,viewName){
			loader.hide();
			app.debug.log('[ROUTER] view "'+viewName+'" loaded!');
		});
	}

	return {
		route:route,
		events:events
	};

	
});
