const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const Cart = require('./app/cart.model');

const app = express();
const port = 8090;

// Enable CORS
app.use(cors());

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

// Endpoint to calculate total GST
app.post('/api/calculate-gst', async (req, res) => {
    const { gstin, email } = req.body;
    console.log(`Received request to calculate GST for GSTIN: ${gstin}, Email: ${email}`);

    try {
        // Find all carts with the given GSTIN
        const carts = await Cart.find({ gstin });
        console.log('Fetched carts:', carts);

        // Calculate the total GST
        let totalGST = 0;
        let uniqueGSTINs = []; // Array to store unique GSTINs
        carts.forEach(cart => {
            if (!uniqueGSTINs.includes(cart.gstin)) {
                uniqueGSTINs.push(cart.gstin);
                totalGST += cart.gst ; // Add GST if available
            }
        });
        console.log(`Total GST calculated: ${totalGST}`);

        // Return the total GST
        res.json({ totalGST });
    } catch (error) {
        console.error('Error calculating total GST:', error);
        res.status(500).send('Error calculating total GST');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
