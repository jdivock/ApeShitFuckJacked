'use strict';

var AuthConstants = require('../constants/AuthConstants');
var AuthAPIUtils = require('../utils/AuthAPIUtils'),
    debug = require('debug')('App:authActions'),
    request = require('superagent');

// var ActionTypes = AuthConstants.ActionTypes;

var AuthActions = {

    /**
     * @param  {string} text
     */
    login: function(context, payload, done) {
        debug('login', context, payload);

        request.post('/api/session').send({
            email: payload.email,
            password: payload.password
        }).end(function(res) {
            var data;

            if (!res.error) {
                data = res.body;
                data.loggedIn = true;
            } else {
                data = {
                    loggedIn: false,
                    error: res.error.message
                };
            }

            context.dispatch('AUTH_LOGIN', data);
            done();
        });
    },
    create: function(context, payload, done) {
        request.post('/api/users').send({
            email: payload.email,
            password: payload.password
        }).end(function(res) {
            var data;

            if (!res.error) {
                data = res.body;
                data.loggedIn = true;
            } else {
                data = {
                    loggedIn: false,
                    error: res.error.message
                };
            }
            context.dispatch('AUTH_LOGIN', data);
            done();
        });
    },
    logout: function(context, payload, done) {
        context.dispatch('AUTH_LOGOUT');
        request.del('/api/session').end();
        done();
    },

    /*
     * Fire off save here, will update application state when server
     * returns success
     */
    saveWorkout: function(context, payload, done) {
        request
            .post('/api/users/me/workout')
            .accept('application/json')
            .type('application/json')
            .send(JSON.stringify(payload.workout))
            .end(function(res) {
              context.dispatch('WORKOUT_ADDED', res.error ? 'fail' : 'success', res.body);
              done();
            });
    },
    getUser: function(context, payload, done) {
      debug('getting user', context);

        request.get('/api/users/me').end(function(res) {

            var data = res.body;

            if (!res.error) {
                if (data && data._id) {
                    data.loggedIn = true;
                }
            } else {
                data = {
                    loggedIn: false,
                    error: res.error.message
                };
            }

            context.dispatch('AUTH_LOGIN', data);
            done();

        });
    }
};

module.exports = AuthActions;
