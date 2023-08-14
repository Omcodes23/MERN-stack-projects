const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// User registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken. Please proceed to login.' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user to the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// User login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    // Create a JWT token with user data (you can add more data as needed)
    const token = jwt.sign({ id: user._id, username: user.username }, 'your_secret_key', {
      expiresIn: '1h', // Set the token expiration time
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login.' });
  }
});

module.exports = router;
