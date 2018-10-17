const path = require('path');

module.exports = {
	mode: 'development',
	optimization: {
		nodeEnv: 'development',
	},
	entry: [
		'babel-polyfill',
		'./js/client',
		'./sass/layout.scss',
	],
	output: {
		path: path.join(__dirname, 'build', 'js'),
		filename: 'app.bundle.js',
		publicPath: '/js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			app: path.resolve(__dirname, './js/shared'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/],
				include: path.join(__dirname, 'js'),
				use: 'babel-loader',
			},
			{
				test: /\.scss?/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
				include: path.join(__dirname, 'sass'),
			},
		],
	},
};
