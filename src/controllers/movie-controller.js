const { StatusCodes } = require("http-status-codes");
const { MovieService } = require("../services");
const catchAsync = require("../utils/catch-async");
const ApiRes = require("../utils/api-response");
const { movieSchemaVal } = require("../validations");
const { errorjoiFromat } = require("../utils/joi-error-clean-format");
const AppError = require("../utils/AppError");



exports.createMovie = catchAsync(async (req, res, next) => {
     // parsing whole req data through joi validation
     const { error, value } = movieSchemaVal.movieValidationSchema(req?.body)

     if (error) {
          // if error comes then it will through error
          const message = errorjoiFromat(error)
          throw new AppError(message, StatusCodes.BAD_REQUEST)
     }

     const movie = await MovieService.createMovie({
          name: value.name,
          description: value.description,
          casts: value.casts,
          trailerUrl: value.trailerUrl,
          language: value.language,
          releaseDate: value.releaseDate,
          director: value.director,
          releaseStatus: value?.releaseStatus
     })
     res.status(StatusCodes.CREATED).json(new ApiRes(StatusCodes.CREATED, true, "Movie Created Successfully..", movie))
})

exports.getAllMovies = catchAsync(async (req, res, next) => {
     const movie = await MovieService.getAllMovies({
          query: req?.query
     })
     console.log(movie, "movie")
     res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, true, "Movies Fetch Successfully..", movie))
})


exports.updateMovie = catchAsync(async (req, res , next) => {
     const { id } = req?.params

     const { error, value } = movieSchemaVal.updateMovieValidationSchema(req?.body)

     if (error) {
          const message = errorjoiFromat(error)
          throw new AppError(message, StatusCodes.BAD_REQUEST)
     }
     const movie = await MovieService.updateMovieById(id , value)
     res.status(StatusCodes.CREATED).json(new ApiRes(StatusCodes.CREATED , true , "Movie updated Successfully.." , movie))

})

exports.getMovieById = catchAsync(async (req , res , next)=>{
      const {id} = req?.params

      const movie =  await MovieService.getMovieById(id)
     res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK , true , "Movie Fetch Successfully.." , movie))

})
exports.deleteMovie = catchAsync(async (req , res , next)=>{
      const {id} = req?.params

      const movie =  await MovieService.deleteMovieById(id)
     res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK , true , "Movie Deleted Successfully.." , movie))

})


