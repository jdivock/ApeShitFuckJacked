'use strict';


var EventEmitter = require('events').EventEmitter,
    BaseStore = require('dispatchr/utils/BaseStore'),
    debug = require('debug')('App:AuthStore'),
    util = require('util');


function AuthStore(dispatcher) {
    this.dispatcher = dispatcher;
    this.auth = {
        loggedIn: false,
        error: null
    };
}

AuthStore.storeName = 'AuthStore';
AuthStore.handlers = {
    'AUTH_CREATE': 'setAuth',
    'AUTH_LOGIN': 'setAuth',
    'AUTH_LOGOUT': 'resetAuth'
};

util.inherits(AuthStore, BaseStore);

AuthStore.prototype.setAuth = function(auth){
    debug('setting auth', auth);

    this.auth = auth;
    this.emitChange();
};

AuthStore.prototype.resetAuth = function(){
    this.auth.loggedIn = false;
    this.emitChange();
};

AuthStore.prototype.getUser = function(){
    return this.auth;
};

AuthStore.prototype.getError = function(){
    return this.auth.error;
};

module.exports = AuthStore;
