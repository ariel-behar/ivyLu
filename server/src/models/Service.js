import mongoose from 'mongoose'

import commonEntitySchema from './common-schemas/commonEntitySchema.js';

const serviceSchema = mongoose.Schema({
    ...commonEntitySchema,
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        enum: ['0:05', '0:10', '0:15', '0:20', '0:25', '0:30', '0:35', '0:40', '0:45', '0:50', '0:55', '1:00', '1:05', '1:10', '1:15', '1:20', '1:25', '1:30', '1:40', '1:45', '1:50', '1:55', '2:00']
    },
},{
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;