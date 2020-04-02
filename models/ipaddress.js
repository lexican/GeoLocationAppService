const mongoose = require('mongoose');

const ipAddressSchema = new mongoose.Schema({

    ipAddress: {
        type:String,
        required: true
    },
    continent: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('IpAddress', ipAddressSchema);