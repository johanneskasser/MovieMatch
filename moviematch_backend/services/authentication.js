const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../services/sendMail");


module.exports = {
    async register (req, res) {
        const duplicate = await User.findOne({
            $or: [
                {email: req.body.email},
                {username: req.body.username}
            ]
        })
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
    },
    async login(req, res) {
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
    },
    async user (req, res) {
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
    },
    async logout(req,res) {
        res.cookie('jwt', '', {maxAge: 0})
        res.send({
            message: 'success'
        })
    },
    async forgot_password(req, res) {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            res.status(404).send({message: 'User does not exist'});
        } else {
            let token = await Token.findOne({ userId: user._id });
            if (token) await token.deleteOne();
            let resetToken = crypto.randomBytes(32).toString("hex");
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(resetToken, Number(salt));

            await new Token({
                userId: user._id,
                token: hash,
                createdAt: Date.now(),
            }).save();

            const link = `${process.env.CLIENT_URL}/passwordReset/${resetToken}/${user._id}`;
            await sendEmail(user.email, "MovieMatch Password Reset Request", {
                name: user.username,
                link: link,
            }, '../services/template/requestResetPassword.handlebars');
            res.status(200).send({
                message: 'success',
                //link: link
            })
        }
    },
    async reset (req, res) {
        const passwordResetToken = await Token.findOne({userId : req.body.userId});
        if(!passwordResetToken) {
            res.status(404).send({
                message: 'Invalid or expired password reset token!'
            })
        } else {
            const isValid = await bcrypt.compare(req.body.token, passwordResetToken.token);
            if(!isValid) {
                res.status(404).send({
                    message: 'Invalid or expired password reset token!'
                })
            } else {
                const salt = await bcrypt.genSalt(10);
                const pw_hash = await bcrypt.hash(req.body.password, salt);
                await User.updateOne(
                    {_id: req.body.userId},
                    {$set: {password: pw_hash}},
                    {new: true}
                );
                const user = await User.findById({_id: req.body.userId})
                await sendEmail(user.email, "Password successfully reset!", {
                    name: user.username,
                }, '../services/template/successfullyResetPassword.handlebars')
                res.status(200).send({
                    message: 'success'
                })
            }
        }
    }
}