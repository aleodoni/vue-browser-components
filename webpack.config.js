// ----------------------------------------------------------------------
// ADMIN WEBPACK CONFIGURATION
// ----------------------------------------------------------------------

// INSTRUCTIONS
// webpack --env.file="./path/to/file"

// Import dependencies
const path                = require('path');
const webpack             = require('webpack');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin   = require('optimize-css-assets-webpack-plugin');
const StringReplacePlugin = require("string-replace-webpack-plugin");
const UglifyJSPlugin      = require('uglifyjs-webpack-plugin');

function resolve(dir) {
	return path.resolve(__dirname, dir);
}

module.exports = (env) => {
	// Get the basename from the filepath
	const filename = path.basename(env.file, '.vue');
	const filepath = path.dirname(env.file);

	return {
		watch : true,
		entry : {
			[filename] : './entry.js'
		},
		output : {
			filename : '[name].js',
			path : path.resolve(__dirname, 'dist', filepath)
		},
		resolve : {
			extensions : ['.vue', '.js'],
			alias : {
				'vue$' : resolve('node_modules/vue/dist/vue.esm.js'),
				'@'    : resolve('src')
			}
		},
		externals : {
			vue : 'Vue',
			lodash : 'lodash'
		},
		module : {
			rules : [
				{
					test : /entry\.js$/,
					loader : StringReplacePlugin.replace({
						replacements: [
							{
								pattern: /__FILE__/ig,
								replacement: function (match, p1, offset, string) {
									return env.file;
								}
							}
						]})
				},
				{
					test : /\.vue$/,
					loader : 'vue-loader',
					options : {
						loaders : ExtractTextPlugin.extract({
							use : {
								css : [
									'vue-style-loader',
									'css-loader'
								],
								postcss : [
									'vue-style-loader',
									'css-loader'
								],
								less : [
									{
										loader : 'vue-style-loader'
									},
									{
										loader : 'css-loader'
									},
									{
										loader : 'less-loader',
										options : {
											paths : [
												path.resolve(__dirname, 'src/less')
											],
											sourceMap : true
										}
									}
								]
							},
							fallback: 'vue-style-loader'
						})
					}
				},
				{
					test : /\.js$/,
					loader : 'babel-loader',
					include : [
						resolve('src')
					]
				}
			]
		},
		plugins : [
			new UglifyJSPlugin({
				sourceMap : true
			}),
			new OptimizeCSSPlugin({
				cssProcessorOptions: {
					safe: true
				}
			})
		]
	};
};