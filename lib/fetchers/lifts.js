'use strict';

var UserC = require('../controllers/users'),
    mongoose = require('mongoose'),
    utils = require('./utils'),
    _ = require('lodash'),
    User = mongoose.model('User');

module.exports = {
    name: 'lifts',
    //At least one of the CRUD methods is required
    //TODO: getWorkouts call only works for me
    read: function(req, resource, params, config, callback) {
        console.log('in lifts');

        var lifts;

        var userId = utils.getUserId(params, req);

        if (!userId) {
            callback(500, {
                error: 'Not logged in and no userId provided'
            });
            return;
        }

        User.findById(userId, function(err, user) {
            if (err || !_.isNumber(params.workoutId)) {
                callback(null, {
                    error: true
                });
            }

            var workout = _.find(user.workouts, {
                id: params.workoutId
            });

            if (!workout) {
                callback(null, {
                    error: 'workout not found'
                });
            }

            if (_.isNumber(params.liftId)) {
                lifts = _.find(workout.lifts, {
                    id: params.liftId
                });
            } else {
                lifts = workout.lifts;
            }

            callback(null, lifts);
        });

    },

    /*
     * Works, but shit
     */
    update: function(req, resource, params, body, config, callback) {
        console.log('lift update');


        User.findById(req.user.id, function(err, user) {
            if (err || !user) {
                callback(null, {
                    error: 'User not found'
                });
                return;
            }


            // Changes weren't persisting when I was modifying
            // user.workouts directly, had to cloneDeep it
            // and then copy it back in, no idea why
            var workoutIdx = _.findIndex(user.workouts, {
                id: params.workoutId
            });
            var liftIdx = _.findIndex(user.workouts[workoutIdx].lifts, {
                id: params.liftId
            });
            var tmpWorkouts = _.cloneDeep(user.workouts);

            body.id = params.liftId;
            tmpWorkouts[workoutIdx].lifts[liftIdx] = body;

            user.workouts = tmpWorkouts;


            user.save(function(err) {
                if (err) {
                    callback(500, {
                        error: 'Error updating workout'
                    });
                    return;
                }

                callback(null, user);

            });

        });



    },
    create: function(req, resource, params, body, config, callback) {
        console.log('create lift');

        User.findById(req.user.id, function(err, user) {
            if (err || !user) {
                callback(null, {
                    error: 'User not found'
                });
                return;
            }

            user.workouts = _.map(user.workouts, function(workout) {
                if (workout.id === params.workoutId) {
                    workout.lifts.push(body);
                }
                return workout;
            });

            user.save(function(err) {
                if (err) {
                    callback(500, {
                        error: 'Error updating workout'
                    });
                    return;
                }

                callback(null, user);

            });

        });
    },

    /**
     * Working, but there's some real shit code in here
     *
     * TODO: lern2Mongo
     */
    delete: function(req, resource, params, config, callback) {
        console.log('delete lift');

        User.findById(req.user.id, function(err, user) {
            if (err || !user) {
                callback(null, {
                    error: 'User not found'
                });
                return;
            }

            // Changes weren't persisting when I was modifying
            // user.workouts directly, had to cloneDeep it
            // and then copy it back in, no idea why
            // Look into maybe using $set?
            var workoutIdx = _.findIndex(user.workouts, {
                id: params.workoutId
            });
            var newLifts = _.reject(user.workouts[workoutIdx].lifts, {
                id: params.liftId
            });
            var tmpWorkouts = _.cloneDeep(user.workouts);

            tmpWorkouts[workoutIdx].lifts = newLifts;
            user.workouts = tmpWorkouts;


            user.save(function(err) {
                if (err) {
                    callback(500, {
                        error: 'Error updating workout'
                    });
                    return;
                }

                console.log('error', err);

                callback(null, tmpWorkouts[workoutIdx].lifts);

            });

        });
    }


};
