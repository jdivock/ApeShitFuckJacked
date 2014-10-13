'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    LocalStrategy = require('passport-local').Strategy;

var TWITTER_CONSUMER_KEY = process.env.TWITTER_LIFT_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_LIFT_CONSUMER_SECRET;

/**
 * Passport configuration
 */
module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        console.log(id);
        User.findOne({
            _id: id
        }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
            done(err, user);
        });
    });

    // add other strategies for more authentication flexibility
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password' // this is the virtual field on the model
        },
        function(email, password, done) {
            User.findOne({
                email: email
            }, function(err, user) {
                if (err) return done(err);

                if (!user) {
                    return done(null, false, {
                        message: 'This email is not registered.'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'This password is not correct.'
                    });
                }
                return done(null, user);
            });
        }
    ));

    // passport.use(new TwitterStrategy({
    //         consumerKey: TWITTER_CONSUMER_KEY,
    //         consumerSecret: TWITTER_CONSUMER_SECRET,
    //         callbackURL: "http://localhost:9000/api/auth/twitter/callback"
    //     },
    //     function(token, tokenSecret, profile, done) {
    //         User.findOrCreate({
    //             provider: profile.provider,
    //             uid: profile.id,
    //             username: profile.username,
    //             name: profile.displayName
    //         }, function(err, user) {
    //             console.log('find or create end');
    //             return done(err, user);
    //         });

    //     }
    // ));
};
