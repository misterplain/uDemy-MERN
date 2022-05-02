const mongoose = require('mongoose');

//functions as a class component can add in js object here 
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

//to be able to use this schema, defined named as Product 
module.exports = mongoose.model('Product', productSchema);