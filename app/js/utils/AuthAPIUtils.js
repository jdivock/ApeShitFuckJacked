'use strict';

var AuthServerActions = require('../actions/AuthServerActions');
var request = require('superagent');

module.exports = {
    saveWorkout: function(workout) {
        request
            .post('/api/users/me/workout')
            .accept('application/json')
            .type('application/json')
            .send(JSON.stringify(workout))
            .end(function(res) {
                AuthServerActions.workoutAdded(res.error ? 'fail' : 'success', res.body);
            });
    },
    getUser: function() {
        request.get('/api/users/me').end(function(res) {

            var data = res.body;

            if (!res.error) {
                if (data && data._id) {
                    data.loggedIn = true;
                }
                AuthServerActions.recieveLogin(data);
            } else {
                data = {
                    loggedIn: false,
                    error: res.error.message
                };
                AuthServerActions.recieveLogin(data);
            }

        });
    },
    login: function(email, password) {
        request.post('/api/session').send({
            email: email,
            password: password
        }).end(function(res) {
            var data;

            if (!res.error) {
                data = res.body;
                data.loggedIn = true;

                AuthServerActions.recieveLogin(data);
            } else {
                data = {
                    loggedIn: false,
                    error: res.error.message
                };
                AuthServerActions.recieveLogin(data);
            }
        });
    },
    create: function(email, password) {
        request.post('/api/users').send({
            email: email,
            password: password
        }).end(function(res) {
            var data;

            if (!res.error) {
                data = res.body;
                data.loggedIn = true;

                AuthServerActions.recieveLogin(data);
            } else {
                data = {
                    loggedIn: false,
                    error: res.error.message
                };
                AuthServerActions.recieveLogin(data);
            }
        });
    },
    logout: function() {
        request.del('/api/session').end();
    }

};
