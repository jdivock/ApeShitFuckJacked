'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    Evernote = require('evernote').Evernote,
    Q = require('q');

var config = {
    EVER_KEY: process.env.APE_EVERNOTE_KEY,
    EVER_SECRET: process.env.APE_EVERNOTE_SECRET,
    APP_NAME: 'ApeShitFuckJacked',
    APP_HOST: process.env.APE_HOST
};

config.SANDBOX = process.env.APE_SANDBOX === 'false' ? false : true;

var dateSort = function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
};

var workoutToNote = function(workout){
    var content;
    content = '<?xml version="1.0" encoding="UTF-8"?>';
    content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
    content += '<en-note>';

    workout.lifts.forEach(function(el,idx){
        content += el.name + '<br/>';
        content += el.weight +  ' x '  + el.sets + ' x ' + el.reps  + '<br/><br/>';
    });

    content += '</en-note>';

    return content;
};

var saveWorkoutToEvernote = function(workout,user){

    var client = new Evernote.Client({
        token: user.evernote.oauthAccessToken,
        sandbox: config.SANDBOX
    });
    var noteStore = client.getNoteStore();

    var note = new Evernote.Note({
        title: workout.date,
        notebookGuid: user.evernote.notebookGuid,
        content: workoutToNote(workout)
    });

    noteStore.createNote(user.evernote.oauthAccessToken, note, function(err) {
        if(err) {
            console.log("ERROR", err);
        }
        
    });

};

exports.addWorkouts = function(req, res, next) {
    console.log('body', req.body);
    console.log('user', req.user);
    console.log('lifts', req.body.lifts);

    if(req.body.id === 'me'){
        console.log('adding for self');
    }

    User.findById(req.user.id, function(err, user) {
        var workout = {
            date: new Date(),
            lifts: req.body.lifts
        };

        user.workouts.push(workout);

        user.workouts.sort(dateSort);

        user.save(function(err) {
            if (err) {
                console.log('Error saving workout: ' + err);
                res.send(500);
            }

            if(user.evernote.sync){
                saveWorkoutToEvernote(workout, user);
            }

            res.json(user.workouts);
        });
    });
};

/*
 * Right, eveything coming down in user call right now
 */
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

    // console.log('userId');

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
        sandbox: config.SANDBOX // Optional (default: true)
    });
    client.getRequestToken(config.APP_HOST + '/api/users/evernoteCb', function(error, oauthToken, oauthTokenSecret, results) {
        if (error) {
            req.session.error = JSON.stringify(error);
            // res.respond(error);
            console.log(error);
            res.send(error.data);
        } else {
            // store the tokens in the session
            req.session.everOauthToken = oauthToken;
            req.session.everOauthTokenSecret = oauthTokenSecret;

            // redirect the user to authorize the token
            res.redirect(client.getAuthorizeUrl(oauthToken));
        }
    });
};

/*
 * Either return the guid of the app notebook or create the notebook
 * and return the guid assocaited with it
 *
 * @returns {string} guid - App notebook to write lifts to
 */
var initNotebook = function(token) {
    var deferred = Q.defer();

    var client = new Evernote.Client({
        token: token,
        sandbox: config.SANDBOX
    });
    var noteStore = client.getNoteStore();
    noteStore.listNotebooks(function(err, notebooks) {
        // req.session.notebooks = notebooks;

        var hasAppNotebook = false;
        // Look for app notebook
        notebooks.forEach(function(el, idx) {
            if (el.name === config.APP_NAME) {
                hasAppNotebook = true;
                deferred.resolve(el.guid);
            }
        });

        if (!hasAppNotebook) {
            var notebook = new Evernote.Notebook({
                name: config.APP_NAME
            });

            noteStore.createNotebook(token, notebook, function(err, notebook) {
                if (err) {
                    console.log('notebook create err', err);
                    deferred.reject(err);
                } else {
                    console.log('notebook created', notebook);
                    deferred.resolve(notebook.guid);
                }
            });
        }
    });

    return deferred.promise;

};

/* 
 * Save evernote credentials and notebook guid to the db
 * 
 * @param {String} guid - evernote notebook guid
 * @param {String} userId - userId extracted from user data stored in session
 * @param {String} - evernote oauthAccessToken to commit notes and actions with
 * @param {String} - evernote secret token to commit actions with
 */
var saveEvernoteInfo = function(guid, userId, oauthAccessToken, oauthAccessTokenSecret) {
    User.findById(userId, function(err, user) {

        user.evernote.notebookGuid = guid;
        user.evernote.sync = true;
        user.evernote.oauthAccessToken = oauthAccessToken;
        user.evernote.oauthAccessTokenSecret = oauthAccessTokenSecret;

        user.save(function(err) {
                if (err) {
                   console.log("error", err);
                } else {
                    console.log("pass");
                }
            });

    });
};


// OAuth callback
exports.evOauthCb = function(req, res) {
    var client = new Evernote.Client({
        consumerKey: config.EVER_KEY,
        consumerSecret: config.EVER_SECRET,
        sandbox: config.SANDBOX
    });

    client.getAccessToken(
        req.session.everOauthToken,
        req.session.everOauthTokenSecret,
        req.param('oauth_verifier'),
        function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
            if (error) {
                console.log('error');
                // console.log(error);
                res.send(error.data);
                // res.redirect('/');
            } else {
                // store the access token in the session
                // req.session.everOauthAccessToken = oauthAccessToken;
                // req.session.everOauthAccessTtokenSecret = oauthAccessTokenSecret;
                console.log('one', oauthAccessTokenSecret);
                req.session.edamShard = results.edam_shard;
                req.session.edamUserId = results.edam_userId;
                req.session.edamExpires = results.edam_expires;
                req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
                req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;


                initNotebook(oauthAccessToken).then(function(guid) {

                        console.log('two', oauthAccessTokenSecret);
                        //optimistic saving? sure.
                        saveEvernoteInfo(guid,req.user._id, oauthAccessToken, oauthAccessTokenSecret);

                        // res.send(req.session);
                        res.redirect('/settings');

                    },
                    function(err) {
                        // res.send(error.data);
                    });

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
    // pull guid from session if it exists
    // TODO: Maybe store this in the db?
    // but then I'd have to maintain it, not sure I want to do that

    res.json(req.user || null);
};
