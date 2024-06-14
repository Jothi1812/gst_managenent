const express = require('express');
const mongoose = require('mongoose');
const Cart = require('./app/cart.model');

const app = express();
const port =8000; // Change the port number

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/GST', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB database');
})
.catch((error) => {
    console.error('Error connecting to MongoDB database:', error);
});

// Middleware
app.use(express.json());

// Serve Angular application (assuming Angular build output is in a folder named 'dist')
app.use(express.static('dist'));

// Route to fetch data from the carts collection
app.get('/api/carts', async (req, res) => {
    try {
        const carts = await Cart.find({}, 'username email gstin gstType contactNumber productName productPrice totalPrice gst'); // Fetch required fields
        res.json(carts);
    } catch (error) {
        console.error('Error fetching carts:', error);
        res.status(500).send('Error fetching carts');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
