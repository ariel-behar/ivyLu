const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

//Valid Phone number pattern:
const PHONE_PATTERN = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

//Email pattern:
const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [2, "First Name should be at least 2 characters long"],
        maxLength: [40, "First Name should be at most 40 characters long"],
        validate: [/[a-zA-z]{2,}/i, 'First Name needs to include only characters from the latin alphabet'],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [2, 'Last name needs to be at least 2 characters long'],
        validate: [/[a-zA-z]{2,}/i, 'Last Name needs to include only characters from the latin alphabet'],
    },
    email: {
        type: String,
        required: true,
        validate: [EMAIL_PATTERN, 'Input should be an e-mail address in a valid format'],
    },
    phone: {
        type: Number,
        required: true,
        validate: [PHONE_PATTERN, 'The input should be a valid phone number'],
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
        // validate: [PASSWORD_PATTERN, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"]
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