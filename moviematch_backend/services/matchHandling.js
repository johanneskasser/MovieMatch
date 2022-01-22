const Match = require("../models/match");

module.exports = {
    async getMatchRequests(req, res) {
        const requestedFriend = req.query.requestedFriend;
        const matchedBack = req.query.matchedBack;

        //console.log(requestedFriend, matchedBack)


        try {
            let response;
            if(matchedBack) {
                response = await Match.find({
                    $or: [
                        {requestedFriend: requestedFriend, matchedBack: matchedBack},
                        {requestingFriend: requestedFriend, matchedBack: matchedBack}
                    ]
                })
            } else {
                response = await Match.find({requestedFriend: requestedFriend, matchedBack: matchedBack})
            }
            res.status(200).send(response)
        } catch (e) {
            res.status(404).send({message: "No Matches Found!"});
        }
    },
    async createMatch(req, res) {
        const moviesToDisplay = req.body.moviesToDisplay
        const likedMovies = req.body.likedMovies
        const requestingFriend = req.body.requestingFriend
        const requestedFriend = req.body.requestedFriend
        const matchedBack = req.body.matchedBack

        //console.log(matchedBack)

        const duplicate = await Match.findOne({
            requestingFriend: requestingFriend,
            requestedFriend: requestedFriend
        })

        if(!matchedBack) {
            if(duplicate) {
                res.status(400).send({message: "Match does already exist!"})
            } else {
                try {
                    await new Match({
                        requestingFriend: requestingFriend,
                        requestedFriend: requestedFriend,
                        matchedBack: false,
                        moviesToDisplay: moviesToDisplay,
                        likedMovies_requestingFriend: likedMovies
                    }).save()
                    res.status(200).send()
                } catch (e) {
                    res.status(400).send(e)
                }
            }
        } else {
            try {
                await Match.updateOne(
                    {requestingFriend: requestingFriend, requestedFriend: requestedFriend},
                    {likedMovies_requestedFriend: likedMovies, matchedBack: true},
                    {new: true}
                )
                res.status(200).send({message: "updated"})
            } catch (e) {
                res.status(404).send(e)
            }
        }
    },
    async deleteMatch(req, res) {
        try {
            await Match.deleteOne({_id: req.query._id})
            res.status(200).send({message: "success"})
        } catch (e) {
            res.status(400).send(e)
        }
    }
}