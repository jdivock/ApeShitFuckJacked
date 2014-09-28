'use strict';

var AuthServerActions = require('../actions/AuthServerActions');
var $ = require('zepto');


module.exports = {
    saveWorkout: function(workout){
        console.log(workout);

        $.ajax({
            type: 'POST',
            url: '/api/users/me/workout',
            data: JSON.stringify(workout),
            headers: {'Accept': 'application/json'},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        }).done(function(resp) {
            AuthServerActions.workoutAdded('success', resp);
        }).fail(function(xhr, type, resp) {
            AuthServerActions.workoutAdded('fail', resp);
        });
    },
    getUser: function() {
        $.ajax({
            type: 'GET',
            url: '/api/users/me'
        }).done(function(resp) {
            var data = resp;
            if (data._id) {
                data.loggedIn = true;
            }
            AuthServerActions.recieveLogin(data);
        }).fail(function(xhr, type, resp) {
            var data = {
                loggedIn: false,
                error: JSON.parse(xhr.response).message
            };
            AuthServerActions.recieveLogin(data);
        });
    },
    login: function(email, password) {
        $.ajax({
            type: 'POST',
            url: '/api/session',
            data: {
                email: email,
                password: password
            }
        }).done(function(resp) {
            var data = resp;
            data.loggedIn = true;

            AuthServerActions.recieveLogin(data);
        }).fail(function(xhr, type, resp) {
            var data = {
                loggedIn: false,
                error: JSON.parse(xhr.response).message
            };
            AuthServerActions.recieveLogin(data);
        });
    },
    create: function(email, password) {
        $.ajax({
            type: 'POST',
            url: '/api/users',
            data: {
                email: email,
                password: password
            }
        }).done(function(resp) {
            var data = resp;
            data.loggedIn = true;

            AuthServerActions.recieveCreate(data);
        }).fail(function(xhr, type) {
            var data = {
                loggedIn: false,
                error: JSON.parse(xhr.response).message
            };
            AuthServerActions.recieveCreate(data);
        });
    },
    logout: function() {
        $.ajax({
            type: 'DELETE',
            url: '/api/session'
        });
    }

};
