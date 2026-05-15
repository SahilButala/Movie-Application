

const { UserService, getUsersService } = require('../services')
const { StatusCodes } = require("http-status-codes");
const ApiRes = require('../utils/api-response');
const catchAsync = require('../utils/catch-async');
const { userSchemaVal } = require('../validations');
const { errorjoiFromat } = require('../utils/joi-error-clean-format');
const AppError = require('../utils/AppError');

// ───────────────────────────────────── REGISTER USER ──────────────────────────────────────────
exports.RegisterUser = catchAsync(async (req, res, next) => {
    const { error, value } = userSchemaVal.userSchemaValidateRegister(req?.body)

    if (error) {
        const message = errorjoiFromat(error)
        throw new AppError(message || "Joi Error during data parsing", StatusCodes.UNPROCESSABLE_ENTITY)
    }

    const user = await UserService.RegisterUser(value)
    return res.status(StatusCodes.CREATED).json(new ApiRes(StatusCodes.CREATED, true, "User Register Successfully....", user));


})
// ──────────────────────────────────── REGISTER USER ───────────────────────────────────────────

// ───────────────────────────────────── LOGIN USER ──────────────────────────────────────────
exports.LoginUser = catchAsync(async (req, res, next) => {
    const { error, value } = userSchemaVal.userSchemaValidateLogin({ email: req?.body?.email })
    if (error) {
        const message = errorjoiFromat(error)
        throw new AppError(message || "Joi Error during data parsing", StatusCodes.UNPROCESSABLE_ENTITY)
    }
    const { user, token } = await UserService.LoginUser({ email: value?.email, password: req?.body?.password })
    return res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, true, "User Login Successfully....", {
        token,
        user
    }));

})
// ──────────────────────────────────── LOGIN USER ───────────────────────────────────────────


// ───────────────────────────────────── GET ALL USERS ──────────────────────────────────────────
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await UserService.getUsers({
         query : req?.query
    })
    return res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, true, "Users are fetch Successfully..", users))
})
// ──────────────────────────────────── GET ALL USERS ───────────────────────────────────────────


// ───────────────────────────────────── UPDATE USER ──────────────────────────────────────────
exports.updateById = catchAsync(async (req, res, next) => {
    const {error , value} = userSchemaVal.userSchemaValidateUpdate(req?.body)

    if(error){
         const message = errorjoiFromat(error)
         throw new AppError(message || "Joi Error During Data Parssing" , StatusCodes.UNPROCESSABLE_ENTITY)
    }
    const user = await UserService.updateUserById(req?.params?.id, value)
    return res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, true, "user updated successfully..", user))
})
// ──────────────────────────────────── UPDATE USER ───────────────────────────────────────────

// ───────────────────────────────────── GET USER BY ID ──────────────────────────────────────────
exports.getUserById = catchAsync(async (req, res, next) => {
    const {user} = await UserService.getUserById(req?.params?.id)
    return res.status(StatusCodes.OK).json(new ApiRes(StatusCodes.OK, true, "user fetch successfully..", user))
})
// ──────────────────────────────────── GET USER BY ID ───────────────────────────────────────────

