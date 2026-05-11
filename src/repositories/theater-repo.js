const { StatusCodes } = require("http-status-codes");
const { theaterModel } = require("../models");
const AppError = require("../utils/AppError");
const paginationResponse = require("../utils/pagination-response");
const CrudRepository = require("./crud-repo");


class theaterRepo extends CrudRepository {
    constructor() {
        super(theaterModel)
    }

    async createTheater(data) {
        return await this.create(data)
    }
    async getTheaters(filter, limit, page) {
        const total = await theaterModel.countDocuments(filter)
        const skip = (parseInt(page - 1) * limit)

        const theaters = await theaterModel.find(filter).limit(limit).skip(skip).populate("movies" , "name")
        return new paginationResponse(parseInt(page), Math.ceil(total / limit), total, theaters)
    }
    async getTheaterById(id, data) {
        const theater = await this.getById(id)
        if (!theater) {
            throw new AppError("Missulenious data or id", StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
    async updateTheaterById(id, data) {
        const theater = await this.updateById(id, data)
        return theater
    }
    async deleteTheater(id) {
        return await this.deleteById(id)
    }

    async updateMovieInTheater(insert, theaterId, movieIds) {
        const theater = await this.getById(theaterId)
        if (!theater) {
            throw new AppError("Theater is not present in our database", StatusCodes.BAD_REQUEST)
        }

        if (!insert) {
            throw new AppError("Please provide details to add movie in theater", StatusCodes.BAD_REQUEST)
        }

        if (insert) {
            // we need to add movies
            movieIds.forEach((movie) => {
                theater.movies.push(movie)
            })

        } else {
            // we need to remove movies

            let savedMoviesIds = theater.movies
            movieIds.forEach((movie) => {
                savedMoviesIds = savedMoviesIds.filter((smi) => smi === movie)
            })

            theater.movies = savedMoviesIds
        }

        await theater.save()
        return theater

    }
}

module.exports = theaterRepo