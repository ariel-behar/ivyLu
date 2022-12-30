import mongoose from 'mongoose'

import * as regex from '../utils/regex.js'

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, "Title should be at least 2 characters long"],
        maxLength: [50, "Title should be at most 50 characters long"],
        validate: [regex.LATIN_CHARACTERS , 'Title should include only characters from the latin alphabet'],
    },
    description: {
        type: String,
        required: true,
        minLength: [5, "Description should be at least 5 characters long"],
        maxLength: [200, "Description should be at most 200 characters long"],
        validate: [regex.LATIN_CHARACTERS, 'Description should include only characters from the latin alphabet'],
    },
    additionalComments: {
        type: String,
        validate: [regex.LATIN_CHARACTERS, 'Additional comments should include only characters from the latin alphabet'],
        minLength: [5, "Additional Comments should be at least 5 characters long"],
        maxLength: [100, "Additional Comments should be at most 100 characters long"],
    },
    imgUrl: {
        type: String,
        required: true,
        validate: [regex.IMAGE_URL, 'Image URL should start with "http://" or "https://" and end with either .jpg|.jpeg|.png|.gif|.svg'],
    },
    price: {
        type: Number,
        required: true,
        minLength: [1, "Price should be at least 1 BGN"],
        maxLength: [999, "Price should be at most 999 BGN"],
    },
    volume: {
        type: String,
        required: true,
        minLength: [1, "Product volume must be at least 1 digit"],
        maxLength: [4, "Product volume must be at most 4 digits"],
    },
    volumeMeasurementUnit: {
        type: String,
        required: true,
        enum: ['grams', 'milliliters']
    },
    productCode: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Product code must be exactly 5 digits"],
        maxLength: [5, "Product code must be exactly 5 digits"],
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
},{
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;