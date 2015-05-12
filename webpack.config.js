'use strict';

var webpack = require('webpack');

module.exports = {
	cache: true,
	entry: './lib/main',
	output: {
		filename: 'bundle.js'
	},
	module: {
		loaders: [
		    {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
		    {test: /\.jsx$/, loader: 'babel-loader' },
		    {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
		    {test: /\.css$/, loader: 'style-loader!css-loader'},
		    {test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
		    {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
		]
	},
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
	resolve: {
		modulesDirectories: ['node_modules', 'lib'],
		extensions: ['', '.js', '.jsx']
	}
};
