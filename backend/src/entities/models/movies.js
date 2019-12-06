import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    year: {type: String},
    rated: {type: String},
    genre: {type: String},
    poster: {type: String},
    plot: {type: String},
    imdbId: {type: String},
    userRatingCount:{type: Number, default: 0},
    totalRating: {type: Number, default: 0},
    lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieList'}]
});

module.exports = mongoose.model('Movie', movieSchema);