import Movie from '../controllers/movieController';

export default (app) => {
    app.get('/api/v1/movies/find', Movie.searchMovie);
    app.post('/api/v1/:user/movielist/create', Movie.createMovieList);
    app.get('/api/v1/:user/movielists', Movie.getMovieListsByUserId);
    app.put('/api/v1/:user/movielists/movie/add', Movie.addMovieToList);
    app.get('/api/v1/:user/movielist/:id', Movie.getMovieList);
    app.get('/api/v1/:user/movie/search', Movie.searchMovie);
    app.get('/api/v1/:user/movie/:imdbId/details', Movie.getMovieDetails);
    app.put('/api/v1/:user/movielist/movie/remove', Movie.removeMovieFromList);
    app.put('/api/v1/:user/movie/:id/rate', Movie.rateMovie);
}