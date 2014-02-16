'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Workout = mongoose.model('Workout'),
    Lift = mongoose.model('Lift'),
    Thing = mongoose.model('Thing');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
    Thing.create({
        name: 'HTML5 Boilerplate',
        info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
        awesomeness: 10
    }, {
        name: 'AngularJS',
        info: 'AngularJS is a toolset for building the framework most suited to your application development.',
        awesomeness: 10
    }, {
        name: 'Karma',
        info: 'Spectacular Test Runner for JavaScript.',
        awesomeness: 10
    }, {
        name: 'Express',
        info: 'Flexible and minimalist web application framework for node.js.',
        awesomeness: 10
    }, {
        name: 'MongoDB + Mongoose',
        info: 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
        awesomeness: 10
    }, function() {
        console.log('finished populating things');
    });
});



// Clear old users, then add a default user
User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test',
        workouts: [{
        date: '2/18/2014',
        lifts: [{
            main: true,
            name: 'Squat',
            reps: 5,
            sets: 3,
            weight: 405,
            unit: 'lbs'
        }]
    }]
    }, function() {
        console.log('finished populating users');

        
    });
});

Workout.find({}).remove(function() {

    Workout.create({
        date: '1/1/2013',
        lifts: [{
            main: true,
            name: 'TEST ORPHAN LIFT \\ WORKOUT',
            reps: 5,
            sets: 3
        }]
    }, function() {
        console.log('finished populating workouts');
    });

});
