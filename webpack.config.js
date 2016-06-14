var webpack=require('webpack'),
	path=require('path'),
	ExtractTextPlugin=require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin=require('html-webpack-plugin'),
	copyWebpackPlugin=require('copy-webpack-plugin'),
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
		copyFile:function(opts){
			return new copyWebpackPlugin(opts);
		}
	},
	configs={};

configs={
	// context:__dirname,
	// watch:true,
	entry:{
		'index':path.join(__dirname,'src/entry/index.js')
	},
	resolve:{
		extensions:['','.js'],
		alias:{
			
		}
	},
	externals:{},
	output:{
		path:path.join(__dirname,'public/'),
		publicPath:'/public/',
		filename:'script/[name].js',
		chunkFilename:'script/[name].[id].chunk.js'
	},
	module:{
		loaders:[
			{test:/\.js$/,loader:'jsx?harmony'},
			{test:/\.css$/,loader:ExtractTextPlugin.extract('style-loader','css-loader')},
			{test:/\.(eot|woff2?|ttf)$/,loader:'url?limit=10000&name=font/[name].[ext]?[hash:8]'},
			{test:/\.(jpe?g|png|gif|svg|)$/,loader:'url?limit=20000&name=image/[name].[ext]?[hash:8]'}
		]
	},
	plugins:[
		plugins.makeCommons({
			name:'common',
			miniChunks:2
		}),
		plugins.extractCss('style/[name].css'),
		plugins.copyFile([//迁移文件
			{from:'src/view',to:'view'},
			{from:'src/script',to:'script'},
			// {from:'src/style',to:'style'},
			{from:'src/lib',to:'lib'},
			{from:'src/i18n',to:'i18n'}
		]),
		plugins.makeHtml({
			favicon:'favicon.ico',
			hash:true,
			inject:'body',
			template:'src/index.html',
			chunks:['common','index']
		})
	],
	devServer:{
		contentBase:path.join(__dirname,'/public'),
		inline:true,
		progress:true,
		port:8124
	}
};

module.exports=configs;
