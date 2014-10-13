'use strict';
require('node-jsx').install({ extension: '.jsx' });
var express = require('express'),
	expressState = require('express-state'),
    path = require('path'),
    fs = require('fs'),
    debug = require('debug')('Example'),
    React = require('react'),
    AuthActions = require('./actions/AuthActions'),
    Application = require('./app'),
    mongoose = require('mongoose');

/**
 * Main application file
 */

// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function(file) {
    require(modelsPath + '/' + file);
});

if (process.env.NODE_ENV !== 'production') {
    require('./lib/config/dummydata');
}

// Passport Configuration
require('./lib/config/passport')();

var app = express();
expressState.extend(app);


require('./lib/config/express')(app);

// Fetcher.registerFetcher(require('./fetchers/message'));
// app.use(Application.config.xhrPath, Fetcher.middleware());

app.use(function (req, res, next) {
    // var fetcher = new Fetcher({
    //     req: req
    // });
    var application = new Application({
        // fetcher: fetcher
    });

    debug('Executing getUser action');
    application.context.getActionContext().executeAction(AuthActions.getUser, {}, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }
        debug('Rendering Application component');
        var html = React.renderComponentToString(application.getComponent());

        debug('Exposing context state');
        res.expose(application.context.dehydrate(), 'Context');
        debug('Rendering application into layout');
        res.render('layout', {
            html: html
        }, function (err, markup) {
            if (err) {
                next(err);
            }
            debug('Sending markup');
            res.send(markup);
        });
    });
});

// Express settings
// require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Start server
app.listen(config.port, function() {
    console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
