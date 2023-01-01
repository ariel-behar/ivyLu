import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as env from 'dotenv'
import * as regex from '../utils/regex.js'

env.config()

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        minLength: [2, "First Name should be at least 2 characters long"],
        maxLength: [40, "First Name should be at most 40 characters long"],
        validate: [regex.LATIN_CHARACTERS, 'First Name should include only characters from the latin alphabet'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        minLength: [2, 'Last name needs to be at least 2 characters long'],
        validate: [regex.LATIN_CHARACTERS, 'Last Name should include only characters from the latin alphabet'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [regex.EMAIL_PATTERN, 'Input should be an e-mail address in a valid format'],
    },
    phone: {
        type: Number,
        required: [true, 'Phone Number is required'],
        validate: [regex.PHONE_PATTERN, 'The input should be a valid phone number'],
        minLength: [6, "Phone number should be at least 6 characters long"],
        maxLength: [14, "Phone number should be at most 14 characters long"]
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: { values: ['male', 'female'], message: 'Gender should be either Male or Female'},
    },
    role: {
        type: Number,
        required: [true, 'User Role is required'],
        enum: [1,2,3]
    },
    imgUrl: {
        type: String,
        required: false,
        validate: [regex.IMAGE_URL, 'Image URL should start with "http://" or "https://" and end with either .jpg|.jpeg|.png|.gif|.svg'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
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

export default User;