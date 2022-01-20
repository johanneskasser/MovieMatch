const mongoose = require("mongoose");


const matchSchema = new mongoose.Schema({
    requestingFriend: {
        type: String,
        required: true
    },
    requestedFriend: {
        type: String,
        required: true
    },
    matchedBack: {
        type: Boolean,
        required: true
    },
    moviesToDisplay: [{
        type: String
    }],
    likedMovies_requestingFriend: [{
        type: String
    }],
    likedMovies_requestedFriend: [{
        type: String
    }]
})

module.exports = mongoose.model('Match', matchSchema)