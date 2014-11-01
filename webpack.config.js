/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './client.js',
    output: {
        path: __dirname + '/build/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'jsx-loader'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader",'css!sass?outputStyle=expanded')
        }]

    },
    plugins: [
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
        //new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    }
};
