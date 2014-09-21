'use strict';

var AuthServerActions = require('../actions/AuthServerActions');
var $ = require('zepto');


module.exports = {

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
