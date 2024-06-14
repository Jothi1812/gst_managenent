const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/GST', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gstin: { type: String, required: true, unique: true, length: 15 }
});

const User = mongoose.model('User', userSchema);

// Register route
app.post('/api/register', async (req, res) => {
  const { email, password, gstin } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { gstin }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'User with this email already exists' });
      } else if (existingUser.gstin === gstin) {
        return res.status(400).json({ message: 'User with this GSTIN already exists' });
      }
    }

    const newUser = new User({ email, password, gstin });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (email === 'admin@gov.in' && password === 'admin') {
        // Admin login
        res.json({ message: 'Admin logged in successfully', userType: 'admin' });
      } else {
        // User login
        const user = await User.findOne({ email, password });
        if (user) {
          res.json({ message: 'User logged in successfully', userType: 'customer' });
        } else {
          res.status(400).json({ message: 'Invalid credentials' });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
