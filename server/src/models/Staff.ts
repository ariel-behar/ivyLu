import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as env from 'dotenv'
import commonUserSchema from './common-schemas/commonUserSchema.js';
import * as regex from '../utils/regex.js'
import { IdType } from '../types/common-types.js';

env.config()

export interface IStaffRegister {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    gender: "male" | "female",
    password: string,
    role: number,
    about?: string,
    imgUrl?: string,
}

export interface IStaffDocument {
    _id: IdType,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    gender: "male" | "female",
    password: string,
    role: number,
    about?: string,
    imgUrl?: string,
}

const staffSchema = new mongoose.Schema({
    ...commonUserSchema,
    role: {
        type: Number,
        required: [true, 'User Role is required'],
        enum: [2, 3, 4]
    },
    about: {
        type: String,
        required: false,
        minLength: [30, 'About Hairdresser needs to be at least 30 characters long'],
        maxLength: [250, 'About Hairdresser needs to be at most 250 characters long'],
        validate: [regex.LATIN_CHARACTERS, 'About Hairdresser should include only characters from the latin alphabet'],
    },
    imgUrl: {
        type: String,
        required: [false, 'Hairdresser Image is required'],
        validate: [regex.IMAGE_URL, 'Image URL should start with "http://" or "https://" and end with either .jpg|.jpeg|.png|.gif|.svg'],
    }

}, {
    timestamps: true
});

staffSchema.pre('save', function (this: IStaffRegister, next: (err?: Error) => void) {
    return bcrypt
        .hash(this.password, Number(process.env.JWT_SALT))
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            if (err.message === 'data and salt arguments required') {
                next(new Error('An error occurred while attempting to sign you up. Please try again'));
            }
            next(new Error(err.message))
        });
});

const Staff = mongoose.model<IStaffDocument>('Staff', staffSchema, 'staff');

export default Staff;