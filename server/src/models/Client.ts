import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as env from 'dotenv'
import commonUserSchema from './common-schemas/commonUserSchema.js';
import { IdType } from '../types/common-types.js';

env.config()

export interface IClientLogin {
    email: string,
    password: string
}

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
        .catch(error => {
            if (error.message === 'data and salt arguments required') {
                throw { code: 500, message: 'An error occurred while attempting to sign you up. Please try again' };
            }
            throw { code: 500, message: error.message };
        });
});

const Client = mongoose.model<IClientDocument>('Client', clientSchema);

export default Client;