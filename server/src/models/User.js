const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const regex = require('../utils/regex')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [2, "First Name should be at least 2 characters long"],
        maxLength: [40, "First Name should be at most 40 characters long"],
        validate: [regex.LATIN_CHARACTERS, 'First Name should include only characters from the latin alphabet'],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [2, 'Last name needs to be at least 2 characters long'],
        validate: [regex.LATIN_CHARACTERS, 'Last Name should include only characters from the latin alphabet'],
    },
    email: {
        type: String,
        required: true,
        validate: [regex.EMAIL_PATTERN, 'Input should be an e-mail address in a valid format'],
    },
    phone: {
        type: Number,
        required: true,
        validate: [regex.PHONE_PATTERN, 'The input should be a valid phone number'],
        minLength: [6, "Phone number should be at least 6 characters long"],
        maxLength: [14, "Phone number should be at most 14 characters long"]
    },
    gender: {
        type: String,
        required: true,
        enum: { values: ['male', 'female'], message: 'Gender should be either Male or Female'},
    },
    role: {
        type: Number,
        required: true,
        enum: [1,2,3]
    },
    password: {
        type: String,
        required: true,
        // minLength: [8, 'Password should be at least 8 characters long'],
        // maxLength: [20, 'Password should be at most 20 characters long'],
        // validate: [regex.PASSWORD_PATTERN, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"]
    },
},{
    timestamps: true
});

userSchema.pre('save', function (next) {
    return bcrypt
        .hash(this.password, Number(process.env.JWT_SALT))
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(error => {
            if (error.message === 'data and salt arguments required') {
                throw { code: 500, message: 'An error occurred while attempting to sign you up. Please try again' };
            }
            throw { code: 500, message: error.message };
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;