import mongoose from 'mongoose'

import commonEntitySchema from './common-schemas/commonEntitySchema.js';

const serviceSchema = mongoose.Schema({
    ...commonEntitySchema,
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        enum: ['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65','70','75','80','85','90','95','100','105','110','115','120']
    },
},{
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;