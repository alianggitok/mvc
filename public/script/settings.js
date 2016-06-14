//settings
define(function(){
	return {
		debug:false,
		info:{
			appName:'ngapp',
			appText:'NGAPP',
			version:'0.02'
		},
		path:{
			root:'',
			view:'/view',
			i18n:'/i18n'
		},
		lang:{
			cookieKey:'i18n',
			langs:[
				{
					id:'zh_CN',
					name:'中文'
				},{
					id:'en',
					name:'English'
				}
			],
			defaultLang:'zh_CN',
			filePrefix:'',
			fileSuffix:'.json'
		},
		navi:[
			{
				state: 'index.one',
				i18nID:'navi.one'
			}, {
				state: 'index.two',
				i18nID:'navi.two'
			}
		]
	};
});
