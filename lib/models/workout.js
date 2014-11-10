'use strict';

var mongoose = require('mongoose'),
    Lift = require('./lift'),
    Schema = mongoose.Schema;

var WorkoutSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    lifts: [Lift],
    comments: {
        type: String
    }
});


mongoose.model('Workout', WorkoutSchema);
