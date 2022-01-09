module.exports = {
    async getMovies(req, res) {
        const request = require('request');
        const APIKEY = process.env.API_KEY

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=en-US'.replace('${APIKEY}', APIKEY),
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            res.send(body)
        });
    }
}