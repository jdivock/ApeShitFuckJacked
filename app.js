/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var Context = require('./util/Context'),
    AuthStore = require('./stores/AuthStore'),
    ApplicationStore = require('./stores/ApplicationStore'),
    application = require('./components/ApeShitFuckJackedApp.react.jsx'),
    debug = require('debug'),
    routes = require('./configs/routes'),
    bootstrapDebug = debug('ApeShitFuckJacked');

Context.registerStore(AuthStore);
Context.registerStore(ApplicationStore);

function App(options) {
    options = options || {};
    var fetcher = options.fetcher,
        initialState = options.initialState;

    debug('Creating context');
    this.context = new Context({
        fetcher: fetcher,
        routes: routes
    });

    if (initialState) {
        bootstrapDebug('rehydrating context');
        this.context.rehydrate(initialState);
    }
}

App.prototype.getComponent = function() {
    debug('Creating Application component');
    var appComponent = application({
        context: this.context.getComponentContext()
    });

    debug('Rendering Application component');
    return appComponent;
};

module.exports = App;
module.exports.config = {
    xhrPath: '/api'
};
