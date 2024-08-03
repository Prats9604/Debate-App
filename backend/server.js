const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./Models/schema');
const DebateTopic = require('./Models/debateTopic');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect("mongodb+srv://Saransh:saransh@atlascluster.kxdnplm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Simple get request
app.get('/', (req, res) => {
    res.send('Welcome to debate app');
});

// Register User
app.post('/api/register', async (req, res) => {
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

        const payload = { user: { id: user.id } };
        console.log("Payload:", payload);

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) {
                console.error("JWT Error:", err);
                throw err;
            }
            console.log("Token:", token);
            res.json({ token });
        });
    } catch (err) {
        console.error("Server Error:", err.message);
        res.status(500).send('Server error');
    }
});

// Login User
app.post('/api/login', async (req, res) => {
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

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create Debate Topic
app.post('/api/debate-topics', async (req, res) => {
    const { topicName, team, userId, leaderName, status } = req.body;

    try {
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const debateTopic = new DebateTopic({
            topicName,
            team,
            userId,
            leaderName,
            status
        });

        await debateTopic.save();
        res.json(debateTopic);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all debate topics
app.get('/api/debate-topics', async (req, res) => {
    try {
        const debateTopics = await DebateTopic.find();
        res.json(debateTopics);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get debate status by ID
app.get('/api/debate-topics/:id/status', async (req, res) => {
    const debateTopicId = req.params.id;

    try {
        const debateTopic = await DebateTopic.findById(debateTopicId);

        if (!debateTopic) {
            return res.status(404).json({ msg: 'Debate topic not found' });
        }

        res.json({ status: debateTopic.status });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
