

const { StatusCodes } = require("http-status-codes")
const { UserRepo } = require("../repositories")
const AppError = require("../utils/AppError")
const catchAsynchandler = require("../utils/catch-async")
const paginationResponse = require("../utils/pagination-response")
const { UserData } = require("../config")


const userRepo = new UserRepo()


const RegisterUser = async (data) => {
    // console.log("data in service layer", data)
    
    const { name, password, email , userStatus , userRole } = data
    // validate data 
    if (!name) {
        throw new AppError("Please Provide Name for Register", StatusCodes.BAD_REQUEST)
    }
    if (!email) {
        throw new AppError("Please Provide email for Register", StatusCodes.BAD_REQUEST)
    }
    if (!password) {
        throw new AppError("Please Provide password for Register", StatusCodes.BAD_REQUEST)
    }

    
    if(!userRole || userRole === UserData.USER_ROLE.customer){
        if(userStatus && userStatus !== UserData.USER_STATUS.approved){
             throw new AppError("We can not set other status for customer" , StatusCodes.BAD_REQUEST)
        }
    }
    if(userRole && userRole !== UserData.USER_ROLE.customer){
        data.userStatus = UserData.USER_STATUS.pending
    }
   
    const user = await userRepo.RegisterUser(data)
    return user

}

const LoginUser = async (data)=>{
     const {email , password} = data
     if(!email){
         throw new AppError("Provide Email to login" , StatusCodes.BAD_REQUEST)
     }
     if(!password){
         throw new AppError("Provide Password to login" , StatusCodes.BAD_REQUEST)
     }

     const user = await userRepo.LoginUser(data)
     return user
}


const getUsers = async (data) => {
    const { page = 1, limit = 10 } = data
    const skip = (parseInt(page) - 1) * limit
    let mongo = {
        limit,
        skip
    }
    const { totalItems, row } = await userRepo.getAll(mongo)
    return new paginationResponse(Number(page), Math.ceil(totalItems / limit), row?.length, row)
}


const updateUserById = async (id , data)=>{
     const user = await userRepo.updateById(id , data)
     return user
}

module.exports = {
    RegisterUser,
    getUsers,
    updateUserById,
    LoginUser
}