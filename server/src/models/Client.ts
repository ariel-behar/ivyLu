import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as env from 'dotenv'
import commonUserSchema from './common-schemas/commonUserSchema.js';
import { IdType } from '../types/common-types.js';
import { sendErrorResponse } from '../utils/sendErrorResponse.js';

env.config()
export interface IClientRegister {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    gender: "male" | "female",
    password: string,
    role: number
}

export interface IClientDocument {
    _id: IdType,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    gender: "male" | "female",
    password: string,
    role: number,
}

const clientSchema = new mongoose.Schema({
    ...commonUserSchema,
    role: {
        type: Number,
        required: [true, 'Customer Role is required'],
        enum: [1]
    }
}, {
    timestamps: true
});

clientSchema.pre('save', function (this: IClientRegister, next: (err?: Error) => void) {
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

const Client = mongoose.model<IClientDocument>('Client', clientSchema);

export default Client;