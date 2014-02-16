'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var LiftSchema = new mongoose.Schema({
	main: { type: Boolean },
	name: { type: String },
	reps: { type: Number },
	sets: { type: Number },
	weight: Number,
	unit: String
});

mongoose.model('Lift', LiftSchema);