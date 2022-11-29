const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PostCssPresetEnv = require('postcss-preset-env')
const CopyPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const devMode = mode === 'development'
const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined

module.exports = {
	mode,
	target,
	devtool,
	devServer: {
		port: 8080,
		// open: true,
		hot: true,
	},
	entry: join(__dirname, 'src', 'index.js'),
	output: {
		path: join(__dirname, 'dist'),
		clean: true,
		filename: 'index.[contenthash].js',
		assetModuleFilename: 'assets/[name][ext]',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: join(__dirname, 'src', 'index.html'),
		}),
		// new HtmlWebpackPlugin({
		// 	template: join(__dirname, 'src', 'index2.html'),
		// }),
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: join(__dirname, 'src/sounds'),
					to: join(__dirname, 'dist/sounds'),
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [PostCssPresetEnv],
							},
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.woff2?$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
			{
				test: /\.(jpe?g|png|webp|gif|svg|mp3)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'img/[name][ext]',
				},
				// use: [
				// 	{
				// 		loader: 'image-webpack-loader',
				// 		options: {
				// 			mozjpeg: {
				// 				progressive: true,
				// 			},
				// 			optipng: {
				// 				enabled: false,
				// 			},
				// 			pngquant: {
				// 				quality: [0.65, 0.9],
				// 				speed: 4,
				// 			},
				// 			gifsicle: {
				// 				interlaced: false,
				// 			},
				// 			webp: {
				// 				quality: 75,
				// 			},
				// 		},
				// 	},
				// ],
			},
			// {
			// 	test: /\.(mp3|wav)$/i,
			// 	type: 'asset/resource',
			// 	generator: {
			// 		filename: 'sound/[name][ext]',
			// 	},
			// },
			{
				test: /\.m?js$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
}
