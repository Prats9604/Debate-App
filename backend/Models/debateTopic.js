const mongoose = require('mongoose');

const DebateTopicSchema = new mongoose.Schema({
    topicName: {
        type: String,
        required: true
    },
    team: {
        type: String,
        enum: ['Red', 'Blue'],
        required: true
    },
    leaderName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Ongoing', 'Completed'],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DebateTopic', DebateTopicSchema);
