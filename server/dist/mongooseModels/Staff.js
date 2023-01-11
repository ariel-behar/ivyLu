import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as env from 'dotenv';
import commonUserSchema from './common-schemas/commonUserSchema.js';
import * as regex from '../utils/regex.js';
env.config();
const staffSchema = new mongoose.Schema(Object.assign(Object.assign({}, commonUserSchema), { role: {
        type: Number,
        required: [true, 'User Role is required'],
        enum: [2, 3, 4]
    }, about: {
        type: String,
        required: true,
        minLength: [30, 'About Hairdresser needs to be at least 30 characters long'],
        maxLength: [250, 'About Hairdresser needs to be at most 250 characters long'],
        validate: [regex.LATIN_CHARACTERS, 'About Hairdresser should include only characters from the latin alphabet'],
    }, imgUrl: {
        type: String,
        required: [true, 'Hairdresser Image is required'],
        validate: [regex.IMAGE_URL, 'Image URL should start with "http://" or "https://" and end with either .jpg|.jpeg|.png|.gif|.svg'],
    } }), {
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
//# sourceMappingURL=Staff.js.map