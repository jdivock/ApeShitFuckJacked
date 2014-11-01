'use strict';

require('node-jsx').install({
    extension: '.jsx'
});
var express = require('express'),
    expressState = require('express-state'),
    path = require('path'),
    fs = require('fs'),
    debug = require('debug')('Example'),
    React = require('react'),
    AuthActions = require('./actions/AuthActions'),
    navigateAction = require('flux-router-component').navigateAction,
    Application = require('./app'),
    mongoose = require('mongoose'),
    os = require('os'),
    Fetcher = require('fetchr');

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


// Clear out dummy user and rebuilt it's profile
// when not in prod
if (process.env.NODE_ENV !== 'production') {
    // require('./lib/config/dummydata');
}

// Passport Configuration
require('./lib/config/passport')();

var app = express();
expressState.extend(app);


require('./lib/config/express')(app);

// Registering fetchers for various api calls
Fetcher.registerFetcher(require('./lib/fetchers/users'));
Fetcher.registerFetcher(require('./lib/fetchers/workouts'));
Fetcher.registerFetcher(require('./lib/fetchers/lifts'));

app.use(Application.config.xhrPath, Fetcher.middleware());

app.use(function(req, res, next) {
    // Passing request object into fetcher
    var fetcher = new Fetcher({
        req: req
    });

    // Building application with fetchers
    var application = new Application({
        fetcher: fetcher
    });

    debug('Executing navigateAction to start up app');
    application.context.getActionContext().executeAction(AuthActions.init, {},
        function(err) {
            if (err) {
                if (err.status && err.status === 404) {
                    next();
                } else {
                    next(err);
                }
                return;
            }

            // Entering callback hell until I can figure out something better
            application.context.getActionContext().executeAction(navigateAction, {
                path: req.url
            }, function(err) {
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
                }, function(err, markup) {
                    if (err) {
                        next(err);
                    }
                    debug('Sending markup');
                    res.send(markup);
                });


            });


        });
});

// Routing
require('./lib/routes')(app);

// Start server
app.listen(config.port, function() {
    console.log('Apeshitfuckjack started at %s:%d in %s mode', config.url, config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
