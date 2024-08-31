const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    debateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DebateTopic',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
