
module.exports = {
    async getMovies(req, res) {
        const request = require('request');
        const APIKEY = process.env.API_KEY;
        const genres = req.query.genres;

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${Genres}&with_watch_monetization_types=flatrate'.replace('${APIKEY}', APIKEY).replace('${Genres}', genres),
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            res.send(body)
        });
    },
    async getMovieImg(req, res) {
        const request = require('request');
        const APIKEY = process.env.API_KEY
        const movieid = req.query.movieid
        console.log(movieid)

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/${MOVIEID}/images?api_key=${APIKEY}&language=en-US'.replace('${APIKEY}', APIKEY).replace('${MOVIEID}', movieid),
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            res.send(body)
        });
    }
}