import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as env from 'dotenv'
import commonUserSchema from './commonUserSchema.js';


env.config()

const staffSchema = new mongoose.Schema({
    ...commonUserSchema,
    role: {
        type: Number,
        required: [true, 'User Role is required'],
        enum: [2, 3, 4]
    },
}, {
    timestamps: true
});

staffSchema.pre('save', function (next) {
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

const Staff = mongoose.model('Staff', staffSchema, 'staff');

export default Staff;