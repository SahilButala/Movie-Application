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

        const theaters = await theaterModel.find(filter).limit(limit).skip(skip).populate("movies", "name")
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
        let theater
        if (insert) {
            // we need to add movies
            // update one taking tw0 parameter , first id that you want to find your doc
            // then second para update a perticular data that you want
            // here we used $addSet : is used to add element into db by avoiding repatative id , reduce duplication similar to set in javascript 
            // here $push can be used but , it can't handle duplication of documnet

            theater = await theaterModel.findByIdAndUpdate({
                _id: theaterId
            }, {
                $addToSet: { movies: { $each: movieIds } }
            }, { new: true })

        } else {
            // we need to remove movies
            theater = await theaterModel.findByIdAndUpdate({
                _id: theaterId
            }, {
                $pull: { movies: { $in: movieIds } }
            }, { new: true })
        }
        if (!theater) {
            throw new AppError("Theater is not present in our database", StatusCodes.BAD_REQUEST)
        }

        return theater.populate("movies" ,"name")
    }


    async getMoviesInTheater(id){
         const theater = await theaterModel.findById(id , {name : 1 , movies : 1 , address : 1})

         if(!theater){
             throw new AppError("Theater is not present inside db" , StatusCodes.BAD_REQUEST)
         }
         return theater.populate("movies" , "name")
    }
}

module.exports = theaterRepo