const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        role: {
            type: String,
            default: 'user'
        },
        //password
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        registeredEvents: [{ 
            type : mongoose.Schema.Types.ObjectId, 
            ref: 'Event' 
        }],
        createdEvents: [{ 
            type : mongoose.Schema.Types.ObjectId, 
            ref: 'Event' 
        }],
    },
    { timestamps: true }
);

UserSchema
    .virtual('password')
    .set(function(password) {
        // create a temporarity variable called _password
        this._password = password;
        // generate salt
        this.salt = this.makeSalt();
        // encryptPassword
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });
 
UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
 
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
 
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
