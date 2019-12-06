import movieManager from "../managers/movieManager";

export async function searchMovie(req, res) {

    let searchCriteria = {
        title: req.query.title,
        page: req.query.page ? req.query.page : 1
    };

    try {
        let results =  await movieManager.searchMovies(searchCriteria);
        return res.status(200).send(results)
    } catch (err) {
        return res.status(400).send('There was an issue with your movie search, please try again');
    }
}

export async function getMovieDetails(req, res) {
    let imdbId = req.params.imdbId;

    try {
        let movieDetails = await movieManager.getMovieDetails(imdbId);

        console.log('RETURNING movieDetails: ' + JSON.stringify(movieDetails));
        return res.status(200).send(movieDetails);
    } catch (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return res.status(400).send('There was an issue getting movie details, please try again');
    }
}

export async function createMovieList(req, res) {
    let movieListObj = req.body.movieListObj;

    try {
        let createdMovieList = await movieManager.createMovieList(movieListObj);

        if (createdMovieList === true) {
            return res.status(201).send('Successfully created movie list');
        } else {
            return res.status(400).send('There was an issue with creating your list, please try again');
        }
    } catch (err) {
        console.log('Bubble up error: ' + JSON.stringify(err));
        return res.status(400).send('There was an issue with created your list, please try again');
    }
}

export async function getMovieListsByUserId (req, res) {
    let userId = req.params.user;

    try {
        let userMovieLists = await movieManager.getMovieListsByUserId(userId);
        console.log('USER MOVIE LISTS: ' + JSON.stringify(userMovieLists));
        return res.status(200).send(userMovieLists);
    } catch (err) {
        console.log('Bubble up error: ' + JSON.stringify(err));
        return res.status(400).send('There was an issue with getting movies lists, please try again');
    }
}

export async function addMovieToList(req, res) {
    let movieObj = req.body.movieObj;

    try {
        let addedMovie = await movieManager.addMovieToList(movieObj);

        if (addedMovie === true) {
            return res.status(201).send('Successfully added movie to list');
        } else {
            return res.status(400).send('There was an issue with adding the movie to your list, please try again');
        }

        return res.status(201).send('Movie was added successfully.');
    } catch (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return res.status(400).send('There was an issue with adding a movie to your list, please try again.');
    }
}

export async function getMovieList(req, res) {
    let movieListId = req.params.id;

    try {
        let movieList = await movieManager.getMovieList(movieListId);
        return res.status(200).send(movieList);
    } catch (err) {
        console.log('Bubble up error: ' + JSON.stringify(err));
        return res.status(400).send('Could not find movie list, please try again.');
    }
}

export async function removeMovieFromList(req, res) {
    let movieObj = req.body.movieObj;
    console.log("movieObj: " + JSON.stringify(movieObj));
    try {
        let removedMovie = await movieManager.removeMovieFromList(movieObj.movieId, movieObj.listId);
        if (removedMovie) {
            return res.status(201).send(removedMovie);
        } else {
            return res.status(400).send('There was an issue with removing your movie from your list');
        }
    } catch (err) {
        return res.status(400).send('There was an issue with removing your movie from your list');
    }
}

export async function rateMovie(req, res) {
    let movieId = req.params.id;
    let userRating = req.body.rating;
    try {
        let ratedMovie = await movieManager.rateMovie(movieId, userRating);
        if (ratedMovie) {
            return res.status(201).send(ratedMovie);
        }
    } catch (err) {
        return res.status(400).send('There was an issue with rating your movie, please try again');
    }
}
export default {
    searchMovie,
    createMovieList,
    getMovieListsByUserId,
    addMovieToList,
    getMovieList,
    getMovieDetails,
    removeMovieFromList,
    rateMovie
}