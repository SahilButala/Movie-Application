

const CrudRepository = require("./crud-repo")
const { userModel } = require("../models")
const AppError = require("../utils/AppError")
const { StatusCodes } = require("http-status-codes")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")
const paginationResponse = require("../utils/pagination-response")


// create token helper function
const gernerateToken = (user) => {
    const payload = {
        id: user?._id,
        role: user?.userRole,
        email: user?.email,
        name: user?.name
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}


class UserRepo extends CrudRepository {
    constructor() {
        super(userModel)
    }
    // Register
    async RegisterUser(data) {
        const isEmailExsist = await userModel.findOne({ email: data?.email })
        if (isEmailExsist) {
            throw new AppError("User is already Register", StatusCodes.BAD_REQUEST)
        }

        const hashPass = await bycrpt.hash(data?.password, 10)
        const updatedData = {
            ...data,
            password: hashPass
        }
        const user = await this.create(updatedData)
        return user
    }

    // Login
    async LoginUser(data) {
        const user = await userModel.findOne({ email: data?.email })

        if (!user) {
            throw new AppError("User not found Please register yourself", StatusCodes.BAD_REQUEST)
        }

        const isPassCorrect = await bycrpt.compare(data?.password, user?.password)

        if (!isPassCorrect) {
            throw new AppError("Password is incorrect please try again", StatusCodes.BAD_REQUEST)
        }

        const token = gernerateToken(user)
        const userObject = user.toObject ? user?.toObject() : user

        const { password, ...userWithoutPassword } = userObject
        return {
            token,
            user: userWithoutPassword
        }

    }
    
    // Get All Users
    async getAllUsers(filter, limit, page) {
        const total = await userModel.countDocuments(filter)
        const skip = parseInt(page - 1) * limit

        const users = await userModel.find(filter).skip(skip).limit(limit)
        return new paginationResponse(parseInt(page), Math.ceil(total / limit), total, users)
    }
    
    // Get User By Id
    async getUserById(id) {
        const user = await userModel.findById(id)

        const userObject = user?.toObject ? user?.toObject() : user

        const {password , ...withOutPasswordUser} = userObject
        return {
             user : withOutPasswordUser
        }
    }

    // Update User
    async updateUserById(id , data){
        const user = await this.updateById(id , data)
        if(!user){
             throw new AppError("User is invalid or not found to update this document" , StatusCodes.BAD_REQUEST)
        }
        return user
    }
}

module.exports = UserRepo