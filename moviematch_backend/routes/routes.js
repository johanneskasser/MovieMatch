const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv/config')

router.post('/register', async (req, res) => {
    const duplicate = await User.findOne({email: req.body.email})

    if(duplicate) {
        res.status(403).send({
            message: 'fuck off'
        })
    }

    if(!duplicate) {
        const salt = await bcrypt.genSalt(10)
        const hashedPW = await bcrypt.hash(req.body.password, salt)

        const user = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hashedPW,
        })
        const result = await user.save()

        const {password, ...data} = await result.toJSON()      //Deconstruct the data to exclude password

        res.send(data)
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)){
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }

    const token = jwt.sign({_id: user._id}, process.env.USER_SECRET_TOKEN)
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //1 Day
    })

    res.send({
        message: 'success'
        //token: token
    })
})

router.get("/user", async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const claims = jwt.verify(cookie, process.env.USER_SECRET_TOKEN)

        if (!claims) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const user = await User.findOne({_id: claims._id})

        const {password, ...data} = await user.toJSON()

        res.send(data)
    } catch(e) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }

})

router.post('/logout', (req,res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'success'
    })
})

module.exports = router;