var keyMirror = require('react/lib/keyMirror');

module.exports = {

    ActionTypes: keyMirror({
        AUTH_CREATE: null,
        AUTH_LOGIN: null,
        AUTH_LOGOUT: null
    }),

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    })

};
