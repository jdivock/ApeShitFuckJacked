'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Workout = mongoose.model('Workout'),
    Lift = mongoose.model('Lift');


// Clear old users, then add a default user
User.find({}).remove(function() {
    User.create({
        provider: 'local',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: 'test',
        workouts: [{
        	id: 'w_id_1',
            date: '2/11/2014',
            lifts: [{
            	id: 'l_id_1',
                main: true,
                name: 'Squat',
                reps: 5,
                sets: 3,
                weight: 405,
                unit: 'lbs'
            }, {
            	id: 'l_id_2',
                main: false,
                name: 'Test Accessory',
                reps: 10,
                sets: 3,
                weight: 80,
                unit: 'lbs'
            }]
        },
        {
        	id: 'w_id_2',
            date: '2/14/2014',
            lifts: [{
            	id: 'l_id_3',
                main: true,
                name: 'Squat',
                reps: 5,
                sets: 3,
                weight: 405,
                unit: 'lbs'
            }, {
            	id: 'l_id_4',
                main: true,
                name: 'Pres',
                reps: 5,
                sets: 3,
                weight: 114,
                unit: 'lbs'
            },{
            	id: 'l_id_5',
                main: false,
                name: 'Test Accessory',
                reps: 10,
                sets: 3,
                weight: 80,
                unit: 'lbs'
            }]
        },
        {
        	id: 'w_id_3',
            date: '2/17/2014',
            lifts: [{
            	id: 'l_id_6',
                main: true,
                name: 'Squat',
                reps: 5,
                sets: 3,
                weight: 405,
                unit: 'lbs'
            },{
            	id: 'l_id_7',
                main: true,
                name: 'DeadLift',
                reps: 5,
                sets: 1,
                weight: 550,
                unit: 'lbs'
            }, {
            	id: 'l_id_8',
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

