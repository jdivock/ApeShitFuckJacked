'use strict';

var mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema,
    Workout = require('./workout'),
    crypto = require('crypto');

var authTypes = ['github', 'twitter', 'facebook', 'google'],
    SALT_WORK_FACTOR = 10;

/**
 * User Schema
 */
var UserSchema = new Schema({
    uid: String,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    evernote: {
        notebookGuid: String,
        oauthAccessToken: String,
        oauthAccessTokenSecret: String,
        sync: Boolean
    },
    workouts: [Workout],
    hashedPassword: String,
    provider: String,
    salt: String,
    facebook: {},
    twitter: {},
    github: {},
    google: {}
});

/**
 * Virtuals
 */
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// Basic info to identify the current authenticated user in the app
UserSchema
    .virtual('userInfo')
    .get(function() {
        return {
            'firstName': this.firstName,
            'lastName': this.lastName,
            'role': this.role,
            'provider': this.provider,
            'evernoteNotebookGuid': this.evernoteNotebookGuid
        };
    });

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            'firstName': this.firstName,
            'lastName': this.lastName,
            'role': this.role
        };
    });

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

// Validate empty email
UserSchema
    .path('email')
    .validate(function(email) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('hashedPassword')
    .validate(function(hashedPassword) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return hashedPassword.length;
    }, 'Password cannot be blank');

/**
 * Plugins
 */
UserSchema.plugin(uniqueValidator, {
    message: 'Value is not unique.'
});

/**
 * Pre-save hook
 */
UserSchema
    .pre('save', function(next) {
        if (!this.isNew) return next();

        if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
            next(new Error('Invalid password'));
        else
            next();
    });

UserSchema.statics = {
    findOrCreate: function(user, done) {
        var self = this;

        self.findOne({
                'uid': user.uid,
                'provider': user.provider
            },
            function(err, userFound) {
                if (!userFound) {
                    self.create({
                        uid: user.uid,
                        provider: user.provider,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }, function(err, newUser) {
                        // console.log('user saved', newUser);
                        done(err, newUser);
                    });

                } else {
                    // User exists
                    done(null, userFound);
                }
            });
    }
};

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * FindOrCreate
     *
     * @return {String}
     * @api public
     */


    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

mongoose.model('User', UserSchema);
