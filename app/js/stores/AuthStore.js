'use strict';


var EventEmitter = require('events').EventEmitter,
    BaseStore = require('dispatchr/utils/BaseStore'),
    debug = require('debug')('App:AuthStore'),
    util = require('util');


function AuthStore(dispatcher) {
    this.dispatcher = dispatcher;
    this.auth = {
        loggedIn: false,
        error: null,
        workouts: []
    };
}

AuthStore.storeName = 'AuthStore';
AuthStore.handlers = {
    'AUTH_CREATE': 'setAuth',
    'AUTH_LOGIN': 'setAuth',
    'AUTH_LOGOUT': 'resetAuth',
    'WORKOUT_ADDED': 'updateWorkout'
};

util.inherits(AuthStore, BaseStore);

AuthStore.prototype.updateWorkout = function(workouts){
    debug('updating workouts', workouts);
    // this.auth.workouts.unshift(workout);
    this.auth.workouts = workouts;
    this.emitChange();
};

AuthStore.prototype.setAuth = function(auth){
    debug('setting auth', auth);

    this.auth = auth;
    this.emitChange();
};

AuthStore.prototype.resetAuth = function(){
    debug('resetting auth');
    this.auth = {
        loggedIn: false,
        workouts: []
    };
    this.emitChange();
};

AuthStore.prototype.getUser = function(){
    debug('getting user', this.auth);
    return this.auth;
};

AuthStore.prototype.getError = function(){
    debug('getting error');
    return this.auth.error;
};

module.exports = AuthStore;
