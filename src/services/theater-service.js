const { StatusCodes } = require("http-status-codes")
const { TheaterRepo } = require("../repositories")
const AppError = require("../utils/AppError")
const { movieModel } = require("../models")


const theaterRepo = new TheaterRepo()


const createTheater = async (data) => {
   const theater = await theaterRepo.createTheater(data)
   return theater
}
const getAllTheaters = async ({ query }) => {
   const filter = {}
   const limit = parseInt(query?.limit) || 10
   const page = parseInt(query?.page) || 1



   if (query?.name) {
      filter.name = query?.name
   }
   if (query?.city) {
      filter.city = query?.city
   }

   if (query?.pincode) {
      filter.pincode = query?.pincode
   }

   if (query?.movieId) {
      filter.movies = { $all: query?.movieId }
   }


   const theater = await theaterRepo.getTheaters(filter, limit, page)
   return theater
}
const getTheater = async (id) => {
   const theater = await theaterRepo.getTheaterById(id)
   if (!id) {
      throw new AppError("Provide id for get theater", StatusCodes.BAD_REQUEST)
   }
   return theater
}
const updateTheater = async (id, data) => {
   const theater = await theaterRepo.updateTheaterById(id, data)
   if (!id) {
      throw new AppError("Provide id for update", StatusCodes.BAD_REQUEST)
   }
   return theater
}
const deleteTheater = async (id) => {
   const theater = await theaterRepo.deleteTheater(id)
   if (!id) {
      throw new AppError("Provide id for update", StatusCodes.BAD_REQUEST)
   }
   return theater
}
const updateMovieInTheater = async ({ insert,
   theaterId,
   movieIds }) => {

   if (!movieIds) {
      throw new AppError("Provide MovieIds to add in theater", StatusCodes.BAD_REQUEST)
   }

   if (!theaterId) {
      throw new AppError("Theater id is missing to add movie in theater", StatusCodes.BAD_REQUEST)
   }


   const theater = await theaterRepo.updateMovieInTheater(insert, theaterId, movieIds)
   return theater
}


const getMoviesInTheater = async (id) => {
   if (!id) {
      throw new AppError("Provide id for update", StatusCodes.BAD_REQUEST)
   }

   const theater = await theaterRepo.getMoviesInTheater(id)
   return theater
}

module.exports = {
   createTheater,
   getAllTheaters,
   getTheater,
   updateTheater,
   deleteTheater,
   updateMovieInTheater,
   getMoviesInTheater
}