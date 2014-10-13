/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';
var webpack = require('webpack');

module.exports = {
    entry: './app/js/app.jsx',
    output: {
        path: __dirname + '/app/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [ {
            test: /\.jsx$/,
            loader: 'jsx-loader'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?outputStyle=expanded'
        }]

    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    }
};
