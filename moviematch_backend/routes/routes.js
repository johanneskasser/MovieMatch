const router = require('express').Router()
const userhandling = require("../services/userhandling")
const authentication = require("../services/authentication")
const netflixapi = require('../services/netflixapi')
const matchHandling = require('../services/matchHandling')

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

router.get('/getMoviesByID', netflixapi.getMoviesbyID)

router.post('/createMatch', matchHandling.createMatch)

router.get('/getMatches', matchHandling.getMatchRequests)

router.get('/getCommonMovies', netflixapi.getCommonMovies)

router.delete('/deleteMatch', matchHandling.deleteMatch)

module.exports = router;