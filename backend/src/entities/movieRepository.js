import Movie from './models/movies';

export async function createMovie(movieObj) {
    return new Promise((resolve, reject) => {
        let newMovie = new Movie({
            title: movieObj.title,
            year: movieObj.year,
            rated: movieObj.rated,
            genre: movieObj.genre,
            poster: movieObj.poster,
            imdbId: movieObj.imdbId,
            plot: movieObj.plot
        });

        newMovie.save((err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    })
}

export async function rateMovie(id, userRatingCount, totalRating) {
    return new Promise((resolve, reject) => {
        Movie.update({_id: id},
            {userRatingCount: userRatingCount, totalRating: totalRating},
            (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
            })
    })
}

export async function getMovieByTitle(title) {
    return new Promise((resolve, reject) => {
        Movie.findOne({title: title}, (err, reply) => {
            if (err) {
                reject(err);
            }
            resolve(reply);
        })
    })
}

export async function addListToMovie(movieId, listId) {
    return new Promise((resolve, reject) => {
        Movie.update({_id: movieId}, {$push: {lists: listId}}, (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    })
}

export async function movieExistsByImdbId(imdbId) {
    return new Promise((resolve, reject) => {
        Movie.exists({imdbId: imdbId}, (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    })
}

export async function findMovieByImdbId(imdbId) {
    return new Promise((resolve, reject) => {
        Movie.findOne({imdbId: imdbId}, (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    })
}

export async function removeListFromMovie(listId, movieId) {
    return new Promise((resolve, reject) => {
        Movie.update({_id: movieId}, {$pull: {lists: listId}}, {multi: true}, (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    })
}

export async function getMovieById(id) {
    return new Promise((resolve, reject) => {
        Movie.findById(id, (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    })
}

export async function getMovieRatingById(id) {
    return new Promise((resolve, reject) => {
        Movie.findById(id, (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply.totalRating);
        })
    })
}

export default {
    createMovie,
    rateMovie,
    getMovieByTitle,
    addListToMovie,
    movieExistsByImdbId,
    findMovieByImdbId,
    removeListFromMovie,
    getMovieById,
    getMovieRatingById
}