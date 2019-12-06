import request from 'request';
import dotenv from 'dotenv';

dotenv.config();

export function searchMoviesByTitle(requestObj) {
    return new Promise((resolve, reject) => {
        let url = process.env.IMDB_API_BASE_URL + generateSearchCriteria(requestObj) + '&apikey=' + process.env.IMDB_API_SECRET + '&r=json';
        console.log('IMDB URL: ' + url);
        request.get(url, (err, response, body) => {
            if (err) reject(err);

            resolve(JSON.parse(body));
        })
    })
}

export function getMovieDetailsByImdbId(imdbId) {
    return new Promise ((resolve, reject) => {
        let url = process.env.IMDB_API_BASE_URL + '?i=' + imdbId + '&apikey=' + process.env.IMDB_API_SECRET + '&r=json';
        console.log('IMDB URL: ' + url);
        request.get(url, (err, response, body) => {
            if (err) {
                reject(err);
            }

            resolve(JSON.parse(body))
        })
    })
}

function generateSearchCriteria(searchCriteria) {
    return '?s=' + searchCriteria.title + '&page=' + searchCriteria.page;
}

export default {
    searchMoviesByTitle,
    getMovieDetailsByImdbId
}