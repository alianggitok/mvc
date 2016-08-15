define([
	'settings',
	'util',
	'exports?angular!exports?window.angular!angular',
	'angular-ui-bootstrap',
	'angular-cookies',
	'angular-translate',
	'angular-translate-loader-partial',
	'angular-ui-router',
	'angular-validation',
	'angular-validation-rule'
],function(
	settings,
	util,
	ng
){

	var appName=settings.info.appName,
		debug=util.debug(settings.debug);

	//手动启动 ngapp
	ng.element(document).ready(function () {  
		ng.bootstrap(document, [appName], {
			//strictDi: true
		});
	});

	//声明主模块
	var app=ng.module(appName,[
		'ui.bootstrap',
		'ui.router',
		'ngCookies',
		'pascalprecht.translate',
		'validation',
		'validation.rule'
	]);
	
	app.debug=debug;

	return {
		app:app,
		settings:settings
	};

});
