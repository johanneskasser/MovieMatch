const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPW = await bcrypt.hash(req.body.password, salt)
    const user = new User ({
        username: req.body.username,
        email: req.body.email,
        password: hashedPW,
    })
    res.send(await user.save())
})

module.exports = router;