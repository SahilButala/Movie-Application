const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catch-async");
const { userModel } = require("../models");
const jwt = require("jsonwebtoken")


const authenticate = catchAsync(async (req, res, next) => {
    const authorization = req?.headers?.authorization
    // console.log(authorization , "token from middleware")

    if (!authorization) {
        throw new AppError("Unauthorized , please login to authorized", StatusCodes.UNAUTHORIZED)
    }


    const extractToken = authorization?.split(" ")[1]

    if (!extractToken) {
        throw new AppError("Unauthorized , please login to authorized", StatusCodes.UNAUTHORIZED)
    }

    const verifyToken = jwt.verify(extractToken, process.env.JWT_SECRET)

    const user = await userModel.findById(verifyToken?.id)

    if (!user) {
        throw new AppError("User is invalid or incorrect Data", StatusCodes.CONFLICT)
    }

    req.user = {
        id: user?._id,
        role: user?.userRole
    }
    next()

})

const adminAccess = (req , res , next)=>{
     const {role} = req?.user
     if(role !== "ADMIN"){
         throw new AppError("You can not access this perticular section or feature , please contact to your adminastrator" , StatusCodes.FORBIDDEN)
     } 
     next()
}

module.exports = {
     authenticate,
     adminAccess
}