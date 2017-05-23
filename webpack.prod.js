let webpack = require('webpack'),
    fs = require('fs'),
	path = require('path'),
	htmlPlugin = require('html-webpack-plugin'),
	extarctTextPlugin = require('extract-text-webpack-plugin'),
	autoPrefixer = require('autoprefixer'),
	postcssSprites = require('postcss-sprites');

let config = {
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'Scripts/[name].js',
        chunkFilename: 'Components/[name].js',
        publicPath: "../"
    },
	module: {
		rules: [
			{
				test: /\.js$/,
				use : 'babel-loader',
				exclude: [
					path.resolve(__dirname, 'node_modules')
				]				
			},{
				test: /\.(scss)|(css)$/,
				use: extarctTextPlugin.extract({
					fallback: 'style-loader',
					use: [
					    'css-loader?minimize',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoPrefixer({
                                        browserslist:['ios >= 7','Android>=4.4']
                                    })
                                ]
                            }
                        },
                        'sass-loader'],
                    publicPath: '../'
				})
			},{
				test: /\.(jpg|png|gif|jpeg)/i,
				use: [
				    'url-loader?limit=3072&name=Images/[name].[ext]'
                ]
			},{
				test: /\.json$/,
				use: 'json-loader'
			},{
				test: /\.(ttf|svg|woff|eot)(\?[a-z0-9#]+)?$/,
				use: 'file-loader?name=Fonts/[name].[ext]'
			},{
				test: /\.vue$/,
				use: 'vue-loader'
			}
		]
	},
	//vue映射,webpack2引入的vue模块没有模板编译器,所以要做这个处理
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.js'
		}
	},
	plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
		new extarctTextPlugin({
			filename: 'Content/[name].css',
			allChunks: true
		}),
		new webpack.LoaderOptionsPlugin({
			options:{
                babel: {
                    "presets": ["es2015"],
                    "plugins": ["transform-runtime"],
                    "comments": false
                }
			}
		})
	]
};

let entryPath = './src/js/';
let entris = fs.readdirSync(entryPath).reduce(function(o, filename){
    if(/\.js/.test(filename)){
        let key = filename.replace(/\.((?!\.).)*$/g,'');
        o[key] = entryPath + filename;

        config.plugins.push(new htmlPlugin({
            template: 'src/' + key + '.html',
            filename: 'Pages/' + key + '.html',
            chunks: [key, 'common']
        }));
    }

    return o;
}, {});

config.entry = entris;
module.exports =config;