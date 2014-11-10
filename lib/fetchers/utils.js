'use strict';

module.exports = {
    getUserId: function(params, req) {
        var userId = null;

        if (params.id === 'me' && req.user && req.user.id) {
            userId = req.user.id;
        } else if (params.id) {
            userId = params.id;
        } else {
            // callback(500, {error: 'Not logged in and no userId provided'});
        }

        return userId;
    }
};
