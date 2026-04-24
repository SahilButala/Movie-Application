

const { UserService , getUsersService } = require('../services')
const { StatusCodes } = require("http-status-codes");
const ApiRes = require('../utils/api-response');
const catchAsync = require('../utils/catch-async');

exports.createUser = async (req, res, next) => {
    try {
        const user = await UserService.createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        return res.status(StatusCodes.CREATED).json(new ApiRes(201, true, "User Created Successfully....", user));
    } catch (error) {
        next(error)
    }
}

exports.getAllUsers = catchAsync(async(req , res , next)=>{
     const users = await UserService.getUsers({
        page : req?.query.page,
        limit : req?.query.limit
     })
     return res.status(StatusCodes.OK).json(new ApiRes(200 , true , "Users" , users))
})


exports.updateById = catchAsync(async (req , res , next)=>{
      const user = await UserService.updateUserById(req?.params?.id , req?.body)

       return res.status(StatusCodes.OK).json(new ApiRes(200 , true , "user updated successfully.." , user))
})

