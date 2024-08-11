const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../Models/schema');

const app = express();
app.use(express.json());

// Register User
app.post('/register', async (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    console.log("Request Body:", req.body);

    try {
        let user = await User.findOne({ email });
        console.log("User Check:", user);

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: 'Passwords do not match' });
        }

        user = new User({ name, email, phone, password });
        console.log("New User:", user);

        const salt = await bcrypt.genSalt(10);
        console.log("Salt:", salt);
        user.password = await bcrypt.hash(password, salt);
        console.log("Hashed Password:", user.password);

        await user.save();
        console.log("User Saved:", user);

        res.json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error("Server Error:", err.message);
        res.status(500).send('Server error');
    }
});

// Login User
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        res.json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = app;
