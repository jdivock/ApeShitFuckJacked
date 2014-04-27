'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Workout = mongoose.model('Workout'),
    Lift = mongoose.model('Lift');


// Clear old users, then add a default user
/*User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test',
        workouts: [{
            date: '2/11/2014',
            lifts: [{
                main: true,
                name: 'Squat',
                reps: 5,
                sets: 3,
                weight: 405,
                unit: 'lbs'
            }, {
                main: false,
                name: 'Test Accessory',
                reps: 10,
                sets: 3,
                weight: 80,
                unit: 'lbs'
            }]
        },
        {
            date: '2/14/2014',
            lifts: [{
                main: true,
                name: 'Squat',
                reps: 5,
                sets: 3,
                weight: 405,
                unit: 'lbs'
            }, {
                main: true,
                name: 'Pres',
                reps: 5,
                sets: 3,
                weight: 114,
                unit: 'lbs'
            },{
                main: false,
                name: 'Test Accessory',
                reps: 10,
                sets: 3,
                weight: 80,
                unit: 'lbs'
            }]
        },
        {
            date: '2/17/2014',
            lifts: [{
                main: true,
                name: 'Squat',
                reps: 5,
                sets: 3,
                weight: 405,
                unit: 'lbs'
            },{
                main: true,
                name: 'DeadLift',
                reps: 5,
                sets: 1,
                weight: 550,
                unit: 'lbs'
            }, {
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
});*/

