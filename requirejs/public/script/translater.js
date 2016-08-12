define(['require','boot','ui'],function(require,boot,ui){
	var settings=boot.settings,
		app=boot.app,
		rootPath=settings.path.root,
		i18nPath=settings.path.i18n,
		langCookieKey=settings.lang.cookieKey,
		langFilePrefix=settings.lang.filePrefix,
		langFileSuffix=settings.lang.fileSuffix,
		langUrlArgs=function(){
			return 'timestamp_'+(new Date()).getTime();
		};

	//i18n配置
	function config(translateProvider,translatePartialLoaderProvider){
		translatePartialLoaderProvider.addPart('index');//首屏
		translateProvider.useLoader('$translatePartialLoader',{//注入translate file loader服务
			urlTemplate:rootPath+i18nPath+'/{part}/'+langFilePrefix+'{lang}'+langFileSuffix+'?'+langUrlArgs()
		});
		translateProvider.useSanitizeValueStrategy('escaped');//字符转义策略
		translateProvider.preferredLanguage(settings.lang.defaultLang);//default language
//		translateProvider.determinePreferredLanguage();//根据浏览器语言自动判断当前语言
//		translateProvider.fallbackLanguage(['en']);//后备，其中的语言会依次预先加载，当首选不可用时，这里的顶上
	}

	//初始化
	function init(translate,cookieStore){
		var langInCookies=cookieStore.get(langCookieKey);
		translate.use(langInCookies);
		translate.refresh();
	}

	//事件
	function events(scope,rootScope,cookieStore,translate,translatePartialLoader){
		scope.changeLanguage=function(lang){
			translate.use(lang);
		};

		rootScope.$on('$translateChangeStart',function(event,lang){
			app.debug.info('[TRANSLATER] switching the language to "'+lang.language+'"...');
		});
		
		rootScope.$on('$translateLoadingStart',function(event,lang){
			app.debug.log('[TRANSLATER] language "'+lang.language+'" file loading...');
		});
		
		rootScope.$on('$translateChangeSuccess',function(event,lang){
			var language=lang.language;
			ui.translateStatus(language);
			app.debug.log('[TRANSLATER] language "'+language+'" switched!');
			cookieStore.put(langCookieKey,language);
			app.debug.log('[TRANSLATER] put in cookies:',langCookieKey,language);
		});
		
		rootScope.$on('$translatePartialLoaderStructureChanged',function(event,route){
			translate.refresh();
			app.debug.log('[TRANSLATER] "'+route+'" translate refreshed');
		});

	}

	return {
		config:config,
		init:init,
		events:events
	};


});
