import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) return next();

    console.log('THIS USER: ' + JSON.stringify(user));
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        console.log('SALT: ' + JSON.stringify(salt));
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            console.log('USER PASSWORD: ' + user.password);
            next();
        });
    });
});

userSchema.methods.comparePassword = function(requestingPassword, cb) {
    bcrypt.compare(requestingPassword, this.password, function(err, match) {
        if (err) return cb(err);
        cb(null, match);
    });
};

module.exports = mongoose.model('User', userSchema);
