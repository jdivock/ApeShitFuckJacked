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
        date: '2/11/2014',
        lifts: [{
            main: true,
            name: 'Squat',
            reps: 5,
            sets: 3,
            weight: 405,
            unit: 'lbs'
        },{
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

// Workout.find({}).remove(function() {

//     Workout.create({
//         date: '1/1/2013',
//         lifts: [{
//             main: true,
//             name: 'TEST ORPHAN LIFT \\ WORKOUT',
//             reps: 5,
//             sets: 3
//         }]
//     }, function() {
//         console.log('finished populating workouts');
//     });

// });
