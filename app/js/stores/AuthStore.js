'use strict';


var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');
var merge = require('react/lib/merge');
var $ = require('zepto');

var CHANGE_EVENT = 'change';

var _auth = {
    loggedIn: false,
    error: null
};

function setLogin(loggedIn) {
    _auth.loggedIn = loggedIn;
}

function setAuthError(error) {
    _auth.error = error;
}

var AuthStore = merge(EventEmitter.prototype, {

    isLoggedIn: function() {
        return _auth.loggedIn;
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


AppDispatcher.register(function(action) {
    var text;

    switch (action.actionType) {
        case AuthConstants.LOGIN:
            var jqr = $.ajax({
                type: 'POST',
                url: '/api/session',
                data: {
                    email: action.email,
                    password: action.password
                }
            }).done(function(data){
				setLogin(true);
            }.bind(this)).fail(function(xhr, type){
            	setAuthError('Login Failed');
            }.bind(this)).always(function(){
            	AuthStore.emitChange();
            });
            break;

        default:
            return true;
    }

    return true;
});

module.exports = AuthStore;
