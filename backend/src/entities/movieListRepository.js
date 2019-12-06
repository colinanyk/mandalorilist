import MovieList from './models/movieList';

export function createList(movieListObject) {
    return new Promise((resolve, reject) => {
        let newList = new MovieList({
            title: movieListObject.title,
            user: movieListObject.userId
        });

        newList.save((err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    })
}

export function getListById(id) {
    return new Promise((resolve, reject) => {
        MovieList.findById(id, (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    })
}

export function getAllListsByUserId(id) {
    return new Promise((resolve, reject) => {
        MovieList.find({user: id}, (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        }).populate('movies')
    })
}

export function addMovieToList(movieListIdArray, movieId) {
    return new Promise((resolve, reject) => {
        MovieList.update({_id: {$in: movieListIdArray}}, {$push: {movies: movieId}}, { multi: true }, (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    })
}

export async function getMoviesByListId (listId) {
    return new Promise((resolve, reject) => {
        MovieList.findById(listId).populate('movies').exec((err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        });
    })
}

export async function removeMovieFromList (listId, movieId) {
    return new Promise((resolve, reject) => {
        MovieList.update({_id: listId}, {$pull: {movies: movieId}}, (err, reply) => {
            if (err) {
                reject(err);
            }

            resolve(reply);
        })
    })
}

export default {
    createList,
    getListById,
    getAllListsByUserId,
    addMovieToList,
    getMoviesByListId,
    removeMovieFromList
}