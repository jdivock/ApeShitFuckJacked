'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    Evernote = require('evernote').Evernote;

var config = {
    EVER_KEY: process.env.APE_EVERNOTE_KEY,
    EVER_SECRET: process.env.APE_EVERNOTE_SECRET
};

var dateSort = function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
};

exports.addWorkouts = function(req, res, next) {
    console.log(req.body);

    User.findById(req.body.id, function(err, user) {
        user.workouts.push({
            date: new Date(),
            lifts: req.body.lifts
        });

        user.workouts.sort(dateSort);

        user.save(function(err) {
            if (err) {
                console.log('Error saving workout: ' + err);
                res.send(500);
            }
            res.send(200);
        });
    });
};

exports.getWorkouts = function(req, res, next) {

};

/** 
 * Create user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';

    newUser.save(function(err) {
        if (err) {
            // Manually provide our own message for 'unique' validation errors, can't do it from schema
            if (err.errors.email.type === 'Value is not unique.') {
                err.errors.email.type = 'The specified email address is already in use.';
            }
            return res.json(400, err);
        }

        req.logIn(newUser, function(err) {
            if (err) return next(err);

            return res.json(req.user.userInfo);
        });
    });
};

/**
 *  Get profile of specified user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) return next(new Error('Failed to load User'));

        if (user) {
            res.send({
                profile: user.profile
            });
        } else {
            res.send(404, 'USER_NOT_FOUND');
        }
    });
};


/*
 * link evernote account
 */
exports.linkEvernote = function(req, res, next) {
    var client = new Evernote.Client({
        consumerKey: config.EVER_KEY,
        consumerSecret: config.EVER_SECRET,
        sandbox: true // Optional (default: true)
    });
    client.getRequestToken('http://localhost:9000/evernoteCb', function(error, oauthToken, oauthTokenSecret, results) {
        if (error) {
            req.session.error = JSON.stringify(error);
           // res.respond(error);
           console.log(error);
            res.send(error.data);
        } else {
            // store the tokens in the session
            req.session.everOauthToken = oauthToken;
            req.session.everOoauthTokenSecret = oauthTokenSecret;

            // redirect the user to authorize the token
            res.redirect(client.getAuthorizeUrl(oauthToken));
        }
    });
};

var initNotebook = function(client, res) {
    var noteStore = client.getNoteStore();
    noteStore.listNotebooks(function(err, notebooks) {
        res.respond(notebooks);
    });
};

// OAuth callback
exports.evOauthCb = function(req, res) {
    var client = new Evernote.Client({
        consumerKey: config.EVER_KEY,
        consumerSecret: config.EVER_SECRET,
        sandbox: true
    });

    client.getAccessToken(
        req.session.oauthToken,
        req.session.oauthTokenSecret,
        req.param('oauth_verifier'),
        function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
            if (error) {
                console.log('error');
                console.log(error);
                res.redirect('/');
            } else {
                // store the access token in the session
                req.session.everOauthAccessToken = oauthAccessToken;
                req.session.everOauthAccessTtokenSecret = oauthAccessTokenSecret;
                req.session.edamShard = results.edam_shard;
                req.session.edamUserId = results.edam_userId;
                req.session.edamExpires = results.edam_expires;
                req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
                req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;

                initNotebook(client, res);

                // res.redirect('/');
            }
        });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {

            user.password = newPass;
            user.save(function(err) {
                if (err) {
                    res.send(500, err);
                } else {
                    res.send(200);
                }
            });
        } else {
            res.send(400);
        }
    });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
    res.json(req.user || null);
};
