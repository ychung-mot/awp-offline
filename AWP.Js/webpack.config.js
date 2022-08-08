const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const SRC = path.resolve(__dirname, 'jsApp');

module.exports = {
	mode: 'development',
	resolve: {
		extensions: ['js'],
		alias: {
			'@awp': SRC,
			'@stores': path.resolve(SRC, 'stores'),
			'@components': path.resolve(SRC, 'components'),
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '../css/web-app/[name].css',
		}),
	],
	devtool: 'source-map',
	optimization: {
		usedExports: true,
		runtimeChunk: 'single',
	},
	entry: {
		appReact: {
			import: path.resolve(SRC, 'index.js'),
			dependOn: ['react-core'],
		},
		loginReact: {
			import: path.resolve(SRC, 'Login.js'),
			dependOn: ['react-core'],
		},
		'react-core': [
			'react',
			'react-dom',
			'react-is',
			'scheduler',
			'react-redux',
			'react-bootstrap',
			'@reduxjs/toolkit',
			'prop-types',
		],
	},
	output: {
		path: path.resolve(__dirname, '../AWP.Web/assets/js/'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		modules: [path.resolve(SRC, 'js'), 'node_modules'],
		fallback: {
			fs: false,
		},
	},
	externals: {
		jquery: 'jQuery',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
				},
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
};
