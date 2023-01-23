import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as env from 'dotenv';
import commonUserSchema from './common-schemas/commonUserSchema.js';
env.config();
const clientSchema = new mongoose.Schema(Object.assign(Object.assign({}, commonUserSchema), { role: {
        type: Number,
        required: [true, 'Customer Role is required'],
        enum: [1]
    } }), {
    timestamps: true
});
clientSchema.pre('save', function (next) {
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
        next(new Error(err.message));
    });
});
const Client = mongoose.model('Client', clientSchema);
export default Client;
//# sourceMappingURL=Client.js.map