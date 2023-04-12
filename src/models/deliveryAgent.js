const mongoose = require('mongoose');

/**
 * id
 * name
 * areaAllocated
 * contactNumber
 * OrderDeliveries
 * createdAt
 * updatedAt
 */

const daSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    areaAllocated: {
        type:  String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    // orderDeliveries: [{}]
}, {timestamps: true});

const DeliveryAgent = mongoose.model('DeliveryAgent', daSchema);

module.exports = DeliveryAgent;