const mongoose = require('mongoose')

const friendshipSchema = new mongoose.Schema({
    requestingFriend: {
        type: String,
        required: true
    },
    requestedFriend: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Friendship', friendshipSchema)