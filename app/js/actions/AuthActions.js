'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');
var AuthAPIUtils = require('../utils/AuthAPIUtils');

var ActionTypes = AuthConstants.ActionTypes;

var AuthActions = {

  /**
   * @param  {string} text
   */
  login: function(email, password) {
    AuthAPIUtils.login(email, password);
  },
  create: function(email, password) {
    AuthAPIUtils.create(email, password);
  },
  logout: function(){
  	AppDispatcher.handleViewAction({
  		actionType: ActionTypes.AUTH_LOGOUT
  	});
  	AuthAPIUtils.logout();
  },

  /*
   * Fire off save here, will update application state when server
   * returns success
   */
  saveWorkout: function(workout){
    AuthAPIUtils.saveWorkout(workout);
  }
};

module.exports = AuthActions;