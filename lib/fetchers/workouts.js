'use strict';

var UserC = require('../controllers/users'),
    mongoose = require('mongoose'),
    utils = require('./utils'),
    _ = require('lodash'),
    debug = require('debug')('ASFJ:fetchers:workouts'),
    User = mongoose.model('User');

module.exports = {
    name: 'workouts',
    //At least one of the CRUD methods is required
    //TODO: getWorkouts call only works for me
    read: function(req, resource, params, config, callback) {
        debug('workout read');

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
        debug('workout update');

        User.findById(req.user.id, function(err, user) {
            if (err || !user) {
                callback(null, {
                    error: 'User not found'
                });
                return;
            }

            user.workouts = _.chain(user.workouts)
                .map(function(workout) {
                    if (workout.id === params.workoutId) {
                        body.id = workout.id;
                        return body;
                    } else {
                        return workout;
                    }
                })
                .sortBy('date')
                .value();


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
        debug('create workout');

        User.findById(req.user.id, function(err, user) {
            if (err || !user) {
                callback(null, {
                    error: 'User not found'
                });
                return;
            }

            var existingWorkoutIdx = _.findIndex(user.workouts, {
                date: body.date
            });

            // More iffy clone code because my mongo schema sucks
            var tmpWorkouts = _.cloneDeep(user.workouts);

            if (existingWorkoutIdx >= 0) {
                var existingWorkout = tmpWorkouts[existingWorkoutIdx];
                existingWorkout.lifts = existingWorkout.lifts.concat(body.lifts);

                // Build comment thread, either append or replace . . . or do nothing
                if (existingWorkout.comments && body.comments) {
                    existingWorkout.comments += '\n' + body.comments;
                } else if (body.comments) {
                    existingWorkout.comments = body.comments;
                }

                tmpWorkouts[existingWorkoutIdx] = existingWorkout;
            } else {
                tmpWorkouts.push(body);
            }

            tmpWorkouts = _.sortBy(tmpWorkouts, 'date');


            // Forcing this again here, not sure why I have to
            user.workouts = tmpWorkouts;

            user.save(function(err, data) {
                if (err) {
                    callback(500, {
                        error: 'Error updating workout'
                    });
                    return;
                }

                debug(data.workouts[existingWorkoutIdx]);

                callback(null, user.workouts);

            });

        });
    },
    delete: function(req, resource, params, config, callback) {
        debug('delete workout');

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
