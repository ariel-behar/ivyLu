import mongoose from 'mongoose'

import commonEntitySchema from './common-schemas/commonEntitySchema.js';

import { serviceDuration } from '../utils/constants.js'
import { IdType } from '../types/common-types.js';

export interface IServiceCreate {
    title: string,
    description: string,
    additionalComments: string | null,
    imgUrl: string,
    price: number,
    duration: string,
    status: 'active' | 'inactive',
    creatorId: IdType
}

export interface IServiceDocument {
    _id: IdType,
    title: string,
    description: string,
    additionalComments: string | null,
    imgUrl: string,
    price: number,
    duration: string,
    status: 'active' | 'inactive',
    creatorId: IdType
}

const serviceSchema = new mongoose.Schema({
    ...commonEntitySchema,
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        enum: serviceDuration
    },
}, {
    timestamps: true
});

const Service = mongoose.model<IServiceDocument>('Service', serviceSchema);

export default Service;