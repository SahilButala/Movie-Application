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

        const theaters = await theaterModel.find(filter).limit(limit).skip(skip)
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
}

module.exports = theaterRepo