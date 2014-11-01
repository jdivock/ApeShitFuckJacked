'use strict';

var AuthConstants = require('../constants/AuthConstants'),
    debug = require('debug')('App:authActions'),
    navigateAction = require('flux-router-component').navigateAction,
    _ = require('lodash'),
    request = require('superagent');

function fetchUser(context, payload, done) {
    context.fetcher.read('users', {
        id: 'me'
    }, null, function(err, data) {

        var user = {};

        //TODO: This makes me feel bad, need to find a better way
        // to handle immutable request object
        if (data && data._id) {
            user.loggedIn = true;
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.workouts = data.workouts;
        } else {
            user = {
                loggedIn: false,
                workouts: []
            };
        }

        context.dispatch('AUTH_LOGIN', user);

        done(err, user);
    });
}


var AuthActions = {
    init: function(context, payload, done){
        debug('initing auth');
        fetchUser(context, payload, function(err, user){

            if(!user.loggedIn){
                payload.path = '/';
            }
            
            context.executeAction(navigateAction, {
                path: payload.path
            }, done);
        });
    },
    getUser: function(context, payload, done){
        fetchUser(context, payload, done);
    },
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
    update: function(context, payload, done){
        context.fetcher.update('users', {
            id: 'me'
        }, payload.user, function(err, data){
            var user ={};
            user.loggedIn = true;
            // console.log('again', user);
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.workouts = data.workouts;

            context.dispatch('AUTH_UPDATE', user);
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
    }
};

module.exports = AuthActions;
