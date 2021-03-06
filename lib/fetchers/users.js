'use strict';

var mongoose = require('mongoose'),
    _ = require('lodash'),
    utils = require('./utils'),
    debug = require('debug')('ASFJ:fetchers:users'),
    User = mongoose.model('User');

module.exports = {
    name: 'users',
    //At least one of the CRUD methods is required
    read: function(req, resource, params, config, callback) {
        debug('read users');

        var userId = utils.getUserId(params, req);

        if (!userId) {
            callback(500, {
                error: 'Not logged in and no userId provided'
            });
            return;
        }



        User.findById(userId, function(err, user) {
            if (err) {
                user = {
                    error: true
                };
            }
            // console.log('user', user);

            callback(null, user);

        });
    },
    /**
     * FYI, only merges properties, does not replace user with what's sent
     * May revisit to change this
     */
    update: function(req, resource, params, body, config, callback) {
        debug('users update');

        var userId = utils.getUserId(params, req);

        User.findById(userId, function(err, user) {
            if (err) {
                callback(null, {
                    error: 'User not found'
                });
                return;
            }

            user = _.merge(user, body);

            user.save(function(err) {

                if (err) {
                    callback(null, {
                        error: 'Error saving user'
                    });
                    return;
                }

                callback(null, user);

            });


        });

    },
    create: function(req, resource, params, body, config, callback) {
        debug('create user');

        var newUser = new User(body);
        newUser.provider = 'local';

        debug(newUser);

        newUser.save(function(err) {
            if (err) {
                console.log('not unique');

                // Manually provide our own message for 'unique' validation errors, can't do it from schema
                if (err.errors.email.type === 'Value is not unique.') {
                    err.errors.email.type = 'The specified email address is already in use.';
                }
                callback(500, err);
                return;
            }

            req.logIn(newUser, function(err) {
                if (err) {
                    callback(null, err);
                    return;
                }

                callback(null, req.user);
            });
        });

    }

};
