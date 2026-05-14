const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catch-async");
const { errorjoiFromat } = require("../utils/joi-error-clean-format");
const { theaterSchemaVal } = require("../validations");
const { TheaterService } = require("../services");
const ApiRes = require("../utils/api-response");



// ───────────────────────────────────── CREATE THEATER ──────────────────────────────────────────
exports.createTheater = catchAsync(async (req, res, next) => {
    const { error, value } = theaterSchemaVal.theaterSchemaValidate(req?.body)

    if (error) {
        const message = errorjoiFromat(error)
        throw new AppError(message, StatusCodes.UNPROCESSABLE_ENTITY)
    }

    const theater = await TheaterService.createTheater({
        name: value?.name,
        description: value?.description,
        pincode: value?.pincode,
        address: value?.address,
        city: value?.city,
    })

    res.status(StatusCodes.CREATED).json(new ApiRes(StatusCodes.CREATED, true, "Theater Create Succssfully..", theater))
})
// ──────────────────────────────────── CREATE THEATER ───────────────────────────────────────────


// ───────────────────────────────────── GET ALL THEATERS ──────────────────────────────────────────
exports.getAllTheaters = catchAsync(async (req, res, next) => {
    const theaters = await TheaterService.getAllTheaters({
        query: req?.query
    })
    res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, true, "Theaters Fetch Succssfully..", theaters))
})
// ──────────────────────────────────── GET ALL THEATERS ───────────────────────────────────────────


// ───────────────────────────────────── GET THEATER ──────────────────────────────────────────
exports.getTheater = catchAsync(async (req, res, next) => {
    const theaters = await TheaterService.getTheater(req?.params?.id)
    res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, true, "Theaters Fetch Succssfully..", theaters))
})
// ──────────────────────────────────── GET THEATER ───────────────────────────────────────────

// ───────────────────────────────────── UPDATE THEATER ──────────────────────────────────────────
exports.updateTheaterById = catchAsync(async (req, res, next) => {
    const { error, value } = theaterSchemaVal.updatetheaterSchemaValidate(req?.body)
    if (error) {
        const message = errorjoiFromat(error)
        throw new AppError(message, StatusCodes.BAD_REQUEST)
    }
    const theater = await TheaterService.updateTheater(req?.params?.id, value)
    res.status(StatusCodes.CREATED).json(new ApiRes(StatusCodes.CREATED, true, "Theater Updated Succssfully..", theater))
})
// ──────────────────────────────────── UPDATE THEATER ───────────────────────────────────────────

// ───────────────────────────────────── DELETE THEATER ──────────────────────────────────────────
exports.deleteTheaterById = catchAsync(async (req, res, next) => {
    const theater = await TheaterService.deleteTheater(req?.params?.id)
    res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, true, "Theater Deleted Succssfully..", theater))
})
// ──────────────────────────────────── DELETE THEATER ───────────────────────────────────────────


// ───────────────────────────────────── UPDATE MOVIES IN THEATERS ──────────────────────────────────────────
exports.updateMoviesInTheaters = catchAsync(async (req, res, next) => {
    const { insert, movieIds } = req?.body
    const { id } = req?.params // theater id
    const theater = await TheaterService.updateMovieInTheater({
        insert,
        theaterId: id,
        movieIds
    })
    res.status(StatusCodes.CREATED).json(new ApiRes(StatusCodes.CREATED, true, "Update Movie in theater Succssfully..", theater))

})
// ──────────────────────────────────── UPDATE MOVIES IN THEATERS ───────────────────────────────────────────



// ───────────────────────────────────── GET ALL MOVIES IN THEATER ──────────────────────────────────────────
exports.getMoviesInTheater = catchAsync(async (req, res, next) => {
    const { theaterId } = req?.params // theater id
    const theater = await TheaterService.getMoviesInTheater(theaterId)
    res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, true, "Getting All Movies inside theater", theater))

})
// ──────────────────────────────────── GET ALL MOVIES IN THEATER ───────────────────────────────────────────

// ───────────────────────────────────── CHECK MOVIE ──────────────────────────────────────────
exports.checkMovieInTheater = catchAsync(async (req, res, next) => {
    const { movieId, theaterId } = req?.params
    const hasMovie = await TheaterService.checkMovieInTheater(theaterId, movieId)
    res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, true, "Successfully checked if movie in theater", hasMovie))
})
// ──────────────────────────────────── CHECK MOVIE ───────────────────────────────────────────