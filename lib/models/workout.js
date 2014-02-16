'use strict';

var mongoose = require('mongoose'),
	Lift = require('./lift'),
    Schema = mongoose.Schema;

var WorkoutSchema = new mongoose.Schema({
    date: { type: Date },
    lifts: [ Lift ]
});


mongoose.model('Workout', WorkoutSchema);
