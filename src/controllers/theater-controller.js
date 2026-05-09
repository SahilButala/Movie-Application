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
        throw new AppError(message, StatusCodes.BAD_REQUEST)
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