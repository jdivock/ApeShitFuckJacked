'use strict';

var AuthConstants = require('../constants/AuthConstants'),
    debug = require('debug')('App:authActions'),
    request = require('superagent');

// var ActionTypes = AuthConstants.ActionTypes;

var AuthActions = {

    /**
     * @param  {string} text
     */
    login: function(context, payload, done) {
        debug('logging in', context, payload);

        request
            .post('/api/session')
            .send({
                email: payload.email,
                password: payload.password
            })
            .end(function(res) {
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
        debug('creating account');

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
        debug('logging out');
        context.dispatch('AUTH_LOGOUT');
        request.del('/api/session').end();
        done();
    },

    /*
     * Fire off save here, will update application state when server
     * returns success
     */
    saveWorkout: function(context, payload, done) {
        console.log(this);

        debug('saving workout', payload);
        request
            .post('/api/users/me/workout')
            .accept('application/json')
            .type('application/json')
            .send(JSON.stringify(payload))
            .end(function(res) {
                debug('workout saved');
                context.dispatch('WORKOUT_ADDED', payload);

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
