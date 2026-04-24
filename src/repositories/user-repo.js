

const CrudRepository = require("./crud-repo")
const {userModel} = require("../models")


class UserRepo extends CrudRepository {
    constructor(){
        super(userModel)
    }
}

module.exports = UserRepo