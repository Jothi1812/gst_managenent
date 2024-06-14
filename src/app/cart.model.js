const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    gstin: String,
    username: String,
    email: String,
    contactNumber: String,
    gstType: String,
    totalPrice: Number,
    gst: Number,
    ProductName:String,
    productPrice:Number
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
