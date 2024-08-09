const express = require('express');
const app = express();
const DebateTopic = require('../Models/debateTopic');


// Create Debate Topic
app.post('/debate-topics', async (req, res) => {
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
app.get('/debate-topics', async (req, res) => {
    try {
        const debateTopics = await DebateTopic.find();
        res.json(debateTopics);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get debate status by ID
app.get('/debate-topics/:id/status', async (req, res) => {
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

module.exports = app;