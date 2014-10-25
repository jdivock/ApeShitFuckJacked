'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Workout = mongoose.model('Workout'),
    Lift = mongoose.model('Lift');


// Clear old users, then add a default user
User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test',
        workouts: [{
        	id: 1,
            date: '2/11/2014',
            lifts: [{
            	id: 1,
                main: true,
                name: 'Squat',
                reps: 5,
                sets: 3,
                weight: 405,
                unit: 'lbs'
            }, {
            	id: 2,
                main: false,
                name: 'Test Accessory',
                reps: 10,
                sets: 3,
                weight: 80,
                unit: 'lbs'
            }]
        },
        {
        	id: 2,
            date: '2/14/2014',
            lifts: [{
            	id: 3,
                main: true,
                name: 'Squat',
                reps: 5,
                sets: 3,
                weight: 405,
                unit: 'lbs'
            }, {
            	id: 4,
                main: true,
                name: 'Pres',
                reps: 5,
                sets: 3,
                weight: 114,
                unit: 'lbs'
            },{
            	id: 5,
                main: false,
                name: 'Test Accessory',
                reps: 10,
                sets: 3,
                weight: 80,
                unit: 'lbs'
            }]
        },
        {
        	id: 3,
            date: '2/17/2014',
            lifts: [{
            	id: 6,
                main: true,
                name: 'Squat',
                reps: 5,
                sets: 3,
                weight: 405,
                unit: 'lbs'
            },{
            	id: 7,
                main: true,
                name: 'DeadLift',
                reps: 5,
                sets: 1,
                weight: 550,
                unit: 'lbs'
            }, {
            	id: 8,
                main: false,
                name: 'Test Accessory',
                reps: 10,
                sets: 3,
                weight: 80,
                unit: 'lbs'
            }]
        }]
    }, function() {
        console.log('finished populating users');


    });
});

