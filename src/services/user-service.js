

const { UserRepo } = require("../repositories")
const AppError = require("../utils/AppError")
const catchAsynchandler = require("../utils/catch-async")
const paginationResponse = require("../utils/pagination-response")


const userRepo = new UserRepo()


const createUser = async (data) => {
    // console.log("data in service layer", data)
    const { name, password, email } = data
    if (!name || !password || !email) {
        throw new AppError("error from user", 404)
    }
    const user = await userRepo.create(data)
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
    createUser,
    getUsers,
    updateUserById
}