'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    passport = require('passport'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

    // Server API Routes
    app.post('/api/users', users.create);

    // app.get('/api/users/me', users.me);
    app.get('/api/users/:id', users.show);

    app.post('/api/users/:id/workout', users.addWorkouts);
    app.get('/api/users/:id/workout', users.getWorkouts);

    app.post('/api/session', session.login);
    app.del('/api/session', session.logout);

    // app.put('/api/users', users.changePassword);

    // app.get('/api/users/evernoteConnect', users.linkEvernote);
    // app.get('/api/users/evernoteCb', users.evOauthCb);



    // app.get('/api/auth/twitter',
    //     passport.authenticate('twitter'));

    // app.get('/api/auth/twitter/callback', passport.authenticate('twitter', {
    //     failureRedirect: '/login'
    // }), function(req, res) {
    //     res.redirect('/');
    // });

    // All other routes to use Angular routing in app/scripts/app.js
    // app.get('/partials/*', index.partials);
    // app.get('/*', middleware.setUserCookie, index.index);
};
