const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors module

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/GST', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});

// Schema for saving cart details
const cartSchema = new mongoose.Schema({
    gstin: String,
    username:String,
    email:String,
    contactNumber:Number,
    gstType:String,
    totalPrice: Number,
    gst: Number
});
const Cart = mongoose.model('Cart', cartSchema);

app.use(cors());
app.use(bodyParser.json());

// Route to handle cart submission
// Route to handle cart submission
app.post('/submit-cart', async (req, res) => {
    const { totalPrice, gst,email,contactNumber,gstType, gstin,username } = req.body;
    console.log('Received cart data:', { gstin,username,email,contactNumber,gstType,totalPrice, gst });

    // Create a new cart document
    const newCart = new Cart({
        gstin,
        username,
        email,
        contactNumber,
        gstType,
        totalPrice,
        gst
    });

    try {
        // Save cart details to MongoDB
        const savedCart = await newCart.save();
        console.log('Cart saved successfully:', savedCart);
        res.status(200).send('Cart saved successfully');
    } catch (error) {
        console.error('Error saving cart:', error);
        res.status(500).send('Error saving cart');
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
