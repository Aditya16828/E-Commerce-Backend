const mongoose = require('mongoose');

/**
 * Attributes
-	model number
-	name
-	category
-	description
-	price
-	discount %
-	feedback/rating
-	images
-	in-stock
-	createdAt
-	updatedAt
 */

const productSchema = new mongoose.Schema({
    modelNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number, 
        required: true
    },
    discount: {
        type: Number
    },
    feedback: {
        type: String
    },
    instockqty: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;