'use strict';

var AuthConstants = require('../constants/AuthConstants'),
    debug = require('debug')('App:authActions'),
    _ = require('lodash'),
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
            debug('create user success', data);


            try {
                context.dispatch('AUTH_LOGIN', data);
                done();
            } catch (e) {
                console.trace();
            }
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
        debug('saving workout', payload);

        request
            .post('/api/users/me/workout')
            .accept('application/json')
            .type('application/json')
            .send(JSON.stringify(payload))
            .end(function(res) {
                debug('workout saved');
                context.dispatch('WORKOUT_ADDED', res.body);

                done();
            });
    },
    getUser: function(context, payload, done) {
        debug('getting user', context);

        context.fetcher.read('users', 'me', null, function(err, data) {

            var user = {};

            //TODO: This makes me feel bad, need to find a better way
            // to handle immutable request object
            if (data && data._id) {
                user.loggedIn = true;
                user.name = data.name;
                user.email = data.email;
                user.workouts = data.workouts;
            } else {
                user = {
                    loggedIn: false,
                    workouts: []
                };
            }

            context.dispatch('AUTH_LOGIN', user);

            done();
        });
    }
};

module.exports = AuthActions;
