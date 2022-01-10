const router = require('express').Router()
const userhandling = require("../services/userhandling")
const authentication = require("../services/authentication")
const netflixapi = require('../services/netflixapi')

router.post('/register', authentication.register);

router.post('/login', authentication.login);

router.get("/user", authentication.user);

router.post('/logout', authentication.logout);

router.post('/forgot-password', authentication.forgot_password);

router.post('/reset', authentication.reset);

router.get('/getUser', userhandling.getUser);

router.put('/requestUser', userhandling.requestUser);

router.get('/getFriends', userhandling.getFriends)

router.put('/manageFriendship', userhandling.manageFriendship)

router.delete('/delete-friendship', userhandling.deleteFriendship);

router.get('/getMovies', netflixapi.getMovies)

router.get('/getMovieImg', netflixapi.getMovieImg)

module.exports = router;