/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
/*global App, document, window */
'use strict';
var React = require('react'),
    debug = require('debug'),
    bootstrapDebug = debug('Example'),
    Fetcher = require('fetchr'),
    Application = require('./app'),
    fetcher = new Fetcher({
        xhrPath: Application.config.xhrPath
    }),
    dehydratedState = App && App.Context; // Sent from the server

require('./styles/pure.css');
require('./styles/main.scss');

window.React = React; // For chrome dev tool support

// HERP Remove me during prod buildz
debug.enable('*');

bootstrapDebug('rehydrating app');
var application = new Application({
    fetcher: fetcher,
    initialState: dehydratedState
});

// Guess this is for debugging?
window.context = application.context;

var app = application.getComponent(),
    mountNode = document.body;

bootstrapDebug('React Rendering');
React.renderComponent(app, mountNode, function() {
    bootstrapDebug('React Rendered');
});
