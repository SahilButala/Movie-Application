const { movieModel } = require("../models");
const paginationResponse = require("../utils/pagination-response");
const CrudRepository = require("./crud-repo");



class MovieRepo extends CrudRepository {

    // data base logic are written here ex : query and all
    constructor() {
        super(movieModel)
    }

    async createMovie(data) {

        const movie = await this.create(data)
        return movie
    }

    async getAllMovies(filter, limit, page) {
        console.log(filter, "repo movie get all")

        const total = await movieModel.countDocuments(filter)
        const skip = parseInt(page - 1) * limit

        const movies = await movieModel.find(filter).limit(limit).skip(skip)
        return new paginationResponse(parseInt(page), Math.ceil(total / limit), total, movies)
    }

    async getMovieById(id) {
        return await this.getById(id)
    }

    async updateMovieById(id, data) {
        return await this.updateById(id, data)
    }

    async deleteMovieById(id) {
        return await this.deleteById(id)
    }
}

module.exports = MovieRepo