'use strict';

var UserC = require('../controllers/users'),
    mongoose = require('mongoose'),
    utils = require('./utils'),
    _ = require('lodash'),
    User = mongoose.model('User');

module.exports = {
    name: 'workouts',
    //At least one of the CRUD methods is required
    //TODO: getWorkouts call only works for me
    read: function(req, resource, params, config, callback) {
        console.log('in workouts');

        var userId = utils.getUserId(params, req);

        if (!userId) {
            callback(500, {
                error: 'Not logged in and no userId provided'
            });
            return;
        }

        var workouts;

        User.findById(userId, function(err, user) {
            if (err) {
                callback(null, {
                    error: true
                });
            }

            if (_.isNumber(params.workoutId)) {
                workouts = _.find(user.workouts, {
                    id: params.workoutId
                });
            } else {
                workouts = user.workouts;
            }

            callback(null, workouts);
        });

    },
    update: function(req, resource, params, body, config, callback) {
        console.log('workout update');

        User.findById(req.user.id, function(err, user) {
            if (err || !user) {
                callback(null, {
                    error: 'User not found'
                });
                return;
            }

            user.workouts = _.map(user.workouts, function(workout) {
                if (workout.id === params.workoutId) {
                    body.id = workout.id;
                    return body;
                } else {
                    return workout;
                }
            });


            user.save(function(err) {
                if (err) {
                    callback(500, {
                        error: 'Error updating workout'
                    });
                    return;
                }

                callback(null, user.workouts);

            });

        });

    },
    create: function(req, resource, params, body, config, callback) {
        console.log('create workout');

        User.findById(req.user.id, function(err, user) {
            if (err || !user) {
                callback(null, {
                    error: 'User not found'
                });
                return;
            }

            user.workouts.push(body);


            user.save(function(err) {
                if (err) {
                    callback(500, {
                        error: 'Error updating workout'
                    });
                    return;
                }

                callback(null, user.workouts);

            });

        });
    },
    delete: function(req, resource, params, config, callback) {

        User.findById(req.user.id, function(err, user) {
            if (err || !user) {
                callback(null, {
                    error: 'User not found'
                });
                return;
            }

            var newWorkouts = _.reject(user.workouts, {
                id: params.workoutId
            });

            user.workouts = newWorkouts;

            user.save(function(err) {
                if (err) {
                    callback(500, {
                        error: 'Error updating workout'
                    });
                    return;
                }

                callback(null, user.workouts);

            });

        });
    }


};
