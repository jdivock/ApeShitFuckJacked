'use strict';


var EventEmitter = require('events').EventEmitter,
    BaseStore = require('dispatchr/utils/BaseStore'),
    debug = require('debug')('App:AuthStore'),
    CHANGE_EVENT = 'change',
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
    'WORKOUT_ADDED': 'updateWorkout',
    'WORKOUT_DELETED': 'updateWorkout',
    'WORKOUT_CREATED': 'updateWorkout',
    'WORKOUT_UPDATED': 'updateWorkout'
};

util.inherits(AuthStore, BaseStore);

AuthStore.prototype.updateWorkout = function(workouts){
    debug('updating workouts', workouts);
    // this.auth.workouts.unshift(workout);
    this.auth.workouts = workouts;
    this.auth.workouts.status = 'SUCCESS';
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

AuthStore.prototype.dehydrate = function () {
    return {
        auth: this.auth
    };
};

AuthStore.prototype.rehydrate = function (state) {
    this.auth = state.auth;
};

/**
 * Rolling my own here as without it I lose react errors which is wildly 
 * painful
 *
 * https://github.com/yahoo/dispatchr/issues/33
 */
AuthStore.prototype.emitChange = function() {
    try {
        this.emit(CHANGE_EVENT, this.constructor);
    } catch (e) {
        console.error(e.stack);
    }
};

module.exports = AuthStore;
