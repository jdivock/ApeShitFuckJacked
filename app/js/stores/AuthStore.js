'use strict';


var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');
var merge = require('react/lib/merge');

var ActionTypes = AuthConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _auth = {
    loggedIn: false,
    error: null
};


function setAuth(auth){
	_auth = auth;
}

function resetAuth(){
	_auth = {
		loggedIn: false,
    	error: null
	};
}

var AuthStore = merge(EventEmitter.prototype, {

    isLoggedIn: function() {
        return _auth.loggedIn;
    },

    getUser: function(){
        return _auth;
    },

    getError: function(){
    	return _auth.error;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});


AppDispatcher.register(function(payload) {
	var action = payload.action;
    var text;

    switch (action.actionType) {
        case ActionTypes.AUTH_LOGIN:
			setAuth(action.data);
            break;
        case ActionTypes.AUTH_CREATE:
            setAuth(action.data);
            break;
        case ActionTypes.AUTH_LOGOUT:
         	resetAuth();
            break;
        default:
            return true;
    }

    AuthStore.emitChange();
    return true;
});

module.exports = AuthStore;
