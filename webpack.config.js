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
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }, // use ! to chain loaders
            // {
            //     test: /\.css$/,
            //     loader: 'style-loader!css-loader'
            // }, {
            //     test: /\.(png|jpg)$/,
            //     loader: 'url-loader?limit=8192'
            // } // inline base64 URLs for <=8k images, direct URLs for the rest


            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader",'css-loader')
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader",'css-loader!sass-loader?outputStyle=expanded')
            }
        ]

    },
    plugins: [
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
        //new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
