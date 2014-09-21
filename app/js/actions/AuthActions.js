'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var AuthActions = {

  /**
   * @param  {string} text
   */
  login: function(email, password) {
    AppDispatcher.dispatch({
      actionType: AuthConstants.AUTH_LOGIN,
      email: email,
      password: password
    });
  },
  create: function(email, password) {
    AppDispatcher.dispatch({
      actionType: AuthConstants.AUTH_CREATE,
      email: email,
      password: password
    });
  },
  logout: function(){
  	AppDispatcher.dispatch({
  		actionType: AuthConstants.AUTH_LOGOUT
  	});
  }
};

module.exports = AuthActions;