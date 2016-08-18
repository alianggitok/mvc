var webpack=require('webpack'),
	path=require('path'),
	configs,
	publicPathName='public',
	devServer={
		contentBase:'',
		inline:true,
		progress:true,
		host:'localhost',//'127.0.0.1',
		port:8124
	},
	ExtractTextPlugin=require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin=require('html-webpack-plugin'),
	CopyWebpackPlugin=require('copy-webpack-plugin'),
	CleanWebpackPlugin=require('clean-webpack-plugin'),
	OpenBrowserWebpackPlugin=require('open-browser-webpack-plugin'),
	plugins={
		makeCommons:function(opts){
			return new webpack.optimize.CommonsChunkPlugin(opts);
		},
		minimize:function(opts){
			return new webpack.optimize.UglifyJsPlugin(opts);
		},
		extractCss:function(opts){
			return new ExtractTextPlugin(opts);
		},
		makeHtml:function(opts){
			return new HtmlWebpackPlugin(opts);
		},
		cleanPath:function(opts){
			return new CleanWebpackPlugin(opts);
		},
		copyFile:function(opts){
			return new CopyWebpackPlugin(opts,{
				copyUnmodified:false
			});
		},
		openBrowser:function(opts){
			return new OpenBrowserWebpackPlugin(opts);
		}
	};

configs={
	// context:__dirname,
//	watch:true,
	entry:{
		'index':path.resolve(__dirname,'src/entry/index.js')
	},
	resolve:{
		extensions:['','.js'],
		alias:{
			'es5-shim':path.resolve(__dirname,'node_modules/es5-shim/es5-shim.min'),
			'json2':path.resolve(__dirname,'node_modules/json-js/json2'),
			'angular':path.resolve(__dirname,'node_modules/angular/angular.min'),
			'angular-cookies':path.resolve(__dirname,'node_modules/angular-cookies/angular-cookies.min'),
			'angular-translate':path.resolve(__dirname,'node_modules/angular-translate/dist/angular-translate.min'),
			'angular-translate-loader-partial':path.resolve(__dirname,'node_modules/angular-translate/dist/angular-translate-loader-partial/angular-translate-loader-partial.min'),
			'angular-ui-router':path.resolve(__dirname,'node_modules/angular-ui-router/release/angular-ui-router.min'),
			'angular-ui-bootstrap':path.resolve(__dirname,'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min'),
			'angular-validation':path.resolve(__dirname,'node_modules/angular-validation/dist/angular-validation.min'),
			'angular-validation-rule':path.resolve(__dirname,'node_modules/angular-validation/dist/angular-validation-rule.min'),
			'bootstrap':path.resolve(__dirname,'node_modules/bootstrap/dist/js/bootstrap.min'),
			'respond.js':path.resolve(__dirname,'node_modules/respond.js/dest/respond.min'),
			'settings':path.resolve(__dirname,'src/script/settings'),
			'main':path.resolve(__dirname,'src/script/main'),
			'boot':path.resolve(__dirname,'src/script/boot'),
			'formValidator':path.resolve(__dirname,'src/script/formValidator'),
			'router':path.resolve(__dirname,'src/script/router'),
			'translater':path.resolve(__dirname,'src/script/translater'),
			'ui':path.resolve(__dirname,'src/script/ui'),
			'util':path.resolve(__dirname,'src/script/util'),
		}
	},
	externals:{},
	output:{
		path:path.resolve(__dirname,publicPathName+'/'),
		publicPath:'/'+publicPathName+'/',
		filename:'script/[name].js',
		chunkFilename:'script/[name].[id].chunk.js'
	},
	module:{
		loaders:[
			{test:/\.js$/,loader:'jsx?harmony'},
			// {test:/\.js$/,loader:'babel',query:{
			// 	"presets": ["es2015"]
			// }},
			{test:/\.css$/,loader:ExtractTextPlugin.extract('style-loader','css-loader')},
			{test:/\.(eot|woff2?|ttf)$/,loader:'url?limit=10000&name=font/[name].[ext]?[hash:8]'},
			{test:/\.(jpe?g|png|gif|svg|)$/,loader:'url?limit=20000&name=image/[name].[ext]?[hash:8]'}
		]
	},
	plugins:[
		plugins.cleanPath([publicPathName]),
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery'
		}),
		plugins.makeCommons({
			name:'common',
			miniChunks:2
		}),
//		plugins.minimize(),
		plugins.extractCss('style/[name].css'),
		plugins.copyFile([//copy文件
			{from:'src/view',to:'view'},
			// {from:'src/script',to:'script'},
			// {from:'src/style',to:'style'},
			// {from:'src/lib',to:'lib'},
			{from:'src/i18n',to:'i18n'}
		]),
		plugins.makeHtml({
			favicon:'favicon.ico',
			hash:true,
			inject:'body',
			template:'src/index.html',
			chunks:['common','index']
		}),
		plugins.openBrowser({
			browser:'chrome',
			url:'http://'+devServer.host+':'+devServer.port+'/'+publicPathName
		})
	],
	devServer:devServer
};

module.exports=configs;
