import mongoose from 'mongoose';

const movieListSchema = new mongoose.Schema({
    title: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    movies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}],
    averageRating: {type: Number, default: 0}
});

module.exports = mongoose.model('MovieList', movieListSchema);