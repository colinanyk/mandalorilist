import imdbIntegration from "../utilities/imdbIntegration";
import movieListRepository from "../entities/movieListRepository";
import movieRepository from "../entities/movieRepository";

export async function searchMovies(requestObj) {
    try {
        let imdbResults = await imdbIntegration.searchMoviesByTitle(requestObj);

        return imdbResults;
    } catch (err) {
        //Add to constants file
        throw new Error('Issue with getting results');
    }
}

export async function getMovieDetails(imdbId) {
    try {
        let movieExists = await movieRepository.movieExistsByImdbId(imdbId);

        if (movieExists) {
            return await movieRepository.findMovieByImdbId(imdbId);
        } else {
            return await imdbIntegration.getMovieDetailsByImdbId(imdbId);

        }
    } catch (err) {
        throw new Error('Issue with getting movie details');
    }
}

export async function createMovieList(movieListObj) {

    try {
        await movieListRepository.createList(movieListObj);
        return true;
    } catch (err) {
        throw new Error('Issue with creating new movie list');
    }
}

export async function getMovieListsByUserId(userId) {
    try {
        let movieLists =  await movieListRepository.getAllListsByUserId(userId);


        for (let i = 0; i < movieLists.length; i++) {
            let totalAverageCount = 0;

            console.log('movieLists[i].movies.length: ' + movieLists[i].movies.length);
            console.log('totalAverageCount: ' + JSON.stringify(totalAverageCount));
            movieLists[i].averageRating = determineMovieListAverageRating(movieLists[i].movies.length, totalAverageCount);
        }

        await movieLists.map(list => {
            let totalRatings = 0;
            for (let i = 0; i < list.movies.length; i++) {
                totalRatings = totalRatings + list.movies[i].totalRating;
            }

            list.averageRating = determineMovieListAverageRating(list.movies.length, totalRatings)
        });

        return movieLists;
    } catch (err) {
        throw new Error('Issue with getting all user movie lists');
    }
}

export async function addMovieToList(movieObj) {

    console.log('movieObj: ' + JSON.stringify(movieObj));
    if (!movieObj.title) {
        return new Error('Movie does not have a title.');
    }

    try {
        let movie = await movieRepository.getMovieByTitle(movieObj.title);

        if (movie) {
            await movieListRepository.addMovieToList(movieObj.listIdArray, movieObj.movieId);
            return await movieRepository.addListToMovie(movieObj.listIdArray);

        } else {
            let createMovie = await movieRepository.createMovie(movieObj);

            if (createMovie) {
                let newlyAddedMovie = await movieRepository.getMovieByTitle(movieObj.title);
                movieObj.movieId = newlyAddedMovie._id;
                await movieRepository.addListToMovie(movieObj.movieId ,movieObj.listIdArray);
                return await movieListRepository.addMovieToList(movieObj.listIdArray, movieObj.movieId)
            }
        }

        return true;
    } catch (err) {
        throw new Error('Issue with adding movie to list');
    }
}

export async function getMovieList(movieListId) {
    try {
        return await movieListRepository.getMoviesByListId(movieListId);
    } catch (err) {
        throw new Error('Issue with getting single movie list');
    }
}

export async function removeMovieFromList(movieId, listId) {
    console.log(movieId + ' ' + listId);
    try {
        return await movieListRepository.removeMovieFromList(movieId, listId);
    } catch (err) {
        throw new Error('Issue with removing movie from list');
    }
}

export async function rateMovie(movieId, userRating) {
    try {
        let movie = await movieRepository.getMovieById(movieId);
        let newAverageRating = determineMovieRation(movie.userRatingCount, movie.totalRating, userRating);
        let ratedMovie =  await movieRepository.rateMovie(movie._id, movie.userRatingCount + 1, newAverageRating);
        console.log('ratedMovie: ' + JSON.stringify(ratedMovie));
        return true;
    } catch (err) {
        throw new Error('Issue with rating movie');
    }
}

function determineMovieRation (userRatingCount, currentRating, userRating) {
    return (currentRating + userRating) / (userRatingCount + 1);
}

function determineMovieListAverageRating(movieCount, movieRatingSum) {
    return movieRatingSum / movieCount;
}

export default {
    searchMovies,
    createMovieList,
    getMovieListsByUserId,
    addMovieToList,
    getMovieList,
    getMovieDetails,
    removeMovieFromList,
    rateMovie
}