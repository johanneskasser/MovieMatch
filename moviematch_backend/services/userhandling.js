const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports = {
    async getUser(req, res) {
        let username = req.query.username;
        let id = req.query.id;
        //console.log(username, id)
        const user = await User.findOne({
            $or: [
                {username: username},
                {_id: id}
            ]
        });
        if (user) {
            const {password, ...data} = user.toJSON();
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: 'user not found!'
            })
        }
    },
    async requestUser (req, res) {
        const reqF = req.body.requestingFriend;
        const requestedF = req.body.requestedFriend;
        //console.log(reqF, requestedF)
        const duplicate = await Friendship.findOne({requestingFriend: reqF, requestedFriend: requestedF})
        //console.log(duplicate)
        if(!duplicate) {
            await new Friendship({
                requestingFriend: reqF,
                requestedFriend: requestedF,
                accepted: false
            }).save()
            res.status(200).send({
                message: 'success'
            })
        } else {
            res.status(400).send({
                message: 'friendship already exists',
            })
        }
    },
    async getFriends (req, res) {
        const user = req.query.id;
        const accepted = req.query.accepted
        //console.log(accepted)
        //console.log(user)
        const friendRequests = await Friendship.find({requestedFriend: user, accepted: accepted})
        //console.log(friendRequests)
        if(friendRequests){
            res.status(200).send(friendRequests)
        } else {
            res.status(404).send({
                message: "no requests found"
            })
        }
    },
    async manageFriendship (req, res) {
        if(req.body.accept === true) {
            try {
                await Friendship.updateOne(
                    {requestingFriend: req.body.requestingFriend,
                        requestedFriend: req.body.requestedFriend},
                    {$set: {accepted: true}},
                    {new: true}
                )
                res.status(200).send({
                    message: 'success'
                })
            } catch(e) {
                res.status(400).send({
                    message: 'error'
                })
            }
        } else if (req.body.accept === false) {
            try {
                await Friendship.deleteOne(
                    {requestingFriend: req.body.requestingFriend,
                    requestedFriend: req.body.requestedFriend}
                )
                res.status(200).send({
                    message: 'success'
                })
            } catch (e) {
                res.status(400).send({
                    message: 'error'
                })
            }
        }

    }
}

