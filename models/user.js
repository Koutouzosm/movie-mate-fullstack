const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    displayName: {
        type: String,
        trim: true,
        required: true
    },
    googleid: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    movies: []
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
