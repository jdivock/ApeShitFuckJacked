'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(express);

/**
 * Express configuration
 */
module.exports = function(app) {

    app.configure(function() {

        app.set('state namespace', 'App');
        app.set('views', config.root + '/templates');
        app.set('view engine', 'jade');

        app.use(express.static(config.root + '/build'));

        app.use(bodyParser.json());

        app.use(express.logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.cookieParser());

        // Persist sessions with mongoStore
        app.use(express.session({
            secret: 'angular-fullstack secret',
            store: new mongoStore({
                url: config.mongo.uri,
                collection: 'sessions'
            })
        }));

        //use passport session
        app.use(passport.initialize());

        app.use(passport.session());

        // Router needs to be last
        app.use(app.router);
    });
};
