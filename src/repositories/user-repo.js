

const CrudRepository = require("./crud-repo")
const {userModel} = require("../models")
const AppError = require("../utils/AppError")
const { StatusCodes } = require("http-status-codes")
const bycrpt = require("bcrypt")


class UserRepo extends CrudRepository {
    constructor(){
        super(userModel)
    }

    async RegisterUser(data){
        const isEmailExsist = await userModel.findOne({email : data?.email})
        if(isEmailExsist){
             throw new AppError("User is already Register" , StatusCodes.BAD_REQUEST)
        }
        
        const hashPass = await bycrpt.hash(data?.password , 10)
        const updatedData = {
            ...data,
            password : hashPass
        }
        const user = await this.create(updatedData)
        return user
    }
}

module.exports = UserRepo