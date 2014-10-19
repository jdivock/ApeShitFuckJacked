'use strict';

var User = require('../controllers/users'),
    passport = require('passport'),
    Session = require('../controllers/session');

module.exports = {
    name: 'users',
    //At least one of the CRUD methods is required
    read: function(req, resource, params, config, callback) {

        var user;

        if (params.action === 'ME') {
            user = req.user;
        }

        callback(null, user);
    }

};