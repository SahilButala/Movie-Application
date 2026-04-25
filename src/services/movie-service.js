const { StatusCodes } = require("http-status-codes");
const { MovieRepo } = require("../repositories");
const AppError = require("../utils/AppError");

const movieRepo = new MovieRepo()


const createMovie = async (data)=>{
    console.log(data , "data from service")
    // validation of fields main business logic
    const movie = await movieRepo.createMovie(data)
    return movie
}

const getAllMovies = async({query})=>{
    const filter = {}
    const limit = parseInt(query?.limit )|| 10
    const page = parseInt(query?.page )|| 1
    if(query?.name){
         filter.name = query?.name
    }
    const movie = await movieRepo.getAllMovies(filter , limit , page)
    return movie
}


const getMovieById = async (id)=>{
   if(!id){
     throw new AppError("id is missing failed to fetch detail of movie" , StatusCodes.BAD_REQUEST)
   }
   const movie = await movieRepo.getMovieById(id)
   return movie
}
const updateMovieById = async (id , data)=>{
   if(!id){
     throw new AppError("id is missing failed to fetch detail of movie" , StatusCodes.BAD_REQUEST)
   }
   const movie = await movieRepo.updateMovieById(id , data)
   return movie
}
const deleteMovieById = async (id )=>{
   if(!id){
     throw new AppError("id is missing failed to fetch detail of movie" , StatusCodes.BAD_REQUEST)
   }
   const movie = await movieRepo.deleteMovieById(id)
   return movie
}



module.exports = { 
    createMovie,
    getAllMovies,
    deleteMovieById,
    getMovieById,
    updateMovieById
}