const mongoose = require('mongoose');

const DebateTopicSchema = new mongoose.Schema({
    debateName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Ongoing', 'Completed', 'Upcoming'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    conclusion: {
        type: String,
        default: ''
    },
    blueTeamLeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blueTeam: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    redTeam: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DebateTopic', DebateTopicSchema);
