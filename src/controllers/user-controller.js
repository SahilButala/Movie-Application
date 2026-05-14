

const { UserService, getUsersService } = require('../services')
const { StatusCodes } = require("http-status-codes");
const ApiRes = require('../utils/api-response');
const catchAsync = require('../utils/catch-async');
const { userSchemaVal } = require('../validations');
const { errorjoiFromat } = require('../utils/joi-error-clean-format');
const AppError = require('../utils/AppError');

exports.RegisterUser = catchAsync(async (req, res, next) => {
    const { error, value } = userSchemaVal.userSchemaValidate(req?.body)

    if (error) {
        const message = errorjoiFromat(error)
        throw new AppError(message || "Joi Error during data parsing", StatusCodes.BAD_REQUEST)
    }
    const user = await UserService.RegisterUser(value)
    return res.status(StatusCodes.CREATED).json(new ApiRes(201, true, "User Register Successfully....", user));


})

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await UserService.getUsers({
        page: req?.query.page,
        limit: req?.query.limit
    })
    return res.status(StatusCodes.OK).json(new ApiRes(200, true, "Users", users))
})


exports.updateById = catchAsync(async (req, res, next) => {
    const user = await UserService.updateUserById(req?.params?.id, req?.body)

    return res.status(StatusCodes.OK).json(new ApiRes(200, true, "user updated successfully..", user))
})

