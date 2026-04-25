const mongoose = require("mongoose")

const movieModel = new mongoose.Schema({
    // name , description , casts ,trailerUrl,language,releaseDate,director,releaseStatus
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength : 5
    },
    casts: {
        type: [String],
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    language: {
        type: [String],
        required: true,
        default: "English"
    },
    releaseDate: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "RELEASED"
    },

}, {
    timestamps: true
})

const movieSchema = mongoose.model.Movies || mongoose.model("Movies" , movieModel)

module.exports = movieSchema