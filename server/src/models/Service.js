const mongoose = require('mongoose');

const IMAGE_URL = /^(?:(?<scheme>[^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*\/)?(?<file>[^?#]*\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]|[Ss][Vv][Gg]))(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/gm

const LATIN_CHARACTERS = /[a-zA-z]/i

const serviceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, "Title should be at least 2 characters long"],
        maxLength: [30, "Title should be at most 30 characters long"],
        validate: [LATIN_CHARACTERS , 'Title should include only characters from the latin alphabet'],
    },
    description: {
        type: String,
        required: true,
        minLength: [5, "Description should be at least 5 characters long"],
        maxLength: [200, "Description should be at most 200 characters long"],
        validate: [LATIN_CHARACTERS, 'Description should include only characters from the latin alphabet'],
    },
    additionalComments: {
        type: String,
        validate: [LATIN_CHARACTERS, 'Additional comments should include only characters from the latin alphabet'],
        minLength: [5, "Additional Comments should be at least 5 characters long"],
        maxLength: [100, "Additional Comments should be at most 100 characters long"],
    },
    imgUrl: {
        type: String,
        required: true,
        validate: [IMAGE_URL, 'Image URL should start with "http://" or "https://" and end with either .jpg|.jpeg|.png|.gif|.svg'],
    },
    price: {
        type: Number,
        required: true,
        minLength: [1, "Price should be at least 1 BGN"],
        maxLength: [999, "Price should be at most 999 BGN"],
    },
    duration: {
        type: String,
        required: true,
        enum: ['0:05', '0:10', '0:15', '0:20', '0:25', '0:30', '0:35', '0:40', '0:45', '0:50', '0:55', '1:00', '1:05', '1:10', '1:15', '1:20', '1:25', '1:30', '1:40', '1:45', '1:50', '1:55', '2:00']
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

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;