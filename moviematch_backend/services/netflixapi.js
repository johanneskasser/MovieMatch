const Match = require("../models/match");
const request = require('request');
const axios = require("axios");


module.exports = {
    async getMovies(req, res) {
        const APIKEY = process.env.API_KEY;
        const genres = req.query.genres;

        await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${Genres}&with_watch_monetization_types=flatrate'.replace('${APIKEY}', APIKEY).replace('${Genres}', genres)).then(function (result) {
            res.status(200).send(result.data.results)
        })
    },
    async getMoviesbyID(req, res) {
        const APIKEY = process.env.API_KEY;
        const requestingFriend = req.query.requestingFriend;
        const requestedFriend = req.query.requestedFriend;

        //console.log(requestingFriend, requestedFriend)

        const result = await Match.findOne({requestingFriend: requestingFriend, requestedFriend: requestedFriend});

        let id = []
        if(result) {
            id = result.moviesToDisplay
            //console.log(id)
        } else {
            res.status(404).send();
        }

        let movies = [];

        for (let i = 0; i < id.length; i++) {
            await axios.get('https://api.themoviedb.org/3/movie/${ID}?api_key=${APIKEY}&language=en-US'.replace('${APIKEY}', APIKEY).replace('${ID}', id[i])).then(function (response) {
                movies.push(response.data)
            })
        }
        res.status(200).send(movies);
    },
}