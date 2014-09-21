'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var ActionTypes = AuthConstants.ActionTypes;

var AuthServerActions = {

  /**
   * @param  {string} text
   */
 recieveLogin: function(data) {
    AppDispatcher.handleServerAction({
      actionType: ActionTypes.AUTH_LOGIN,
      data: data
    });
  },
  recieveCreate: function(data) {
    AppDispatcher.handleServerAction({
      actionType: ActionTypes.AUTH_CREATE,
      data: data
    });
  }
};

module.exports = AuthServerActions;