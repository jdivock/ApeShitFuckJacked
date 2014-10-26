'use strict';

var debug = require('debug')('App:workoutActions'),
    _ = require('lodash'),
    request = require('superagent');

var WorkoutActions = {
    
    deleteWorkout: function(context, payload, done){
        context.fetcher.delete('workouts', {
            id: 'me',
            workoutId: payload.workoutId
        }, null, function(err, workouts){
            context.dispatch('WORKOUT_DELETED', workouts);
            done();
        });
    },
    createWorkout: function(context, payload, done){
        context.fetcher.create('workouts', {
            id: 'me',
            workoutId: payload.workout.id
        }, payload.workout, function(err, workouts){
            context.dispatch('WORKOUT_CREATED', workouts);
            done();
        });
    },
    updateWorkout: function(context, payload, done){
        context.fetcher.update('workouts', {
            id: 'me',
            workoutId: payload.workout.id
        }, payload.workout, function(err, workouts){
            context.dispatch('WORKOUT_UPDATED', workouts);
            done();
        });
    }

};

module.exports = WorkoutActions;
