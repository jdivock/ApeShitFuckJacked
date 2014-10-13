'use strict';

var User = require('../controllers/users');

module.exports = {
    name: 'users',
    //At least one of the CRUD methods is required
    read: function(req, resource, params, config, callback) {

    	var user;

    	if(params === 'me'){
    		user = req.user;
    	}

        callback(null, user);
    }

};