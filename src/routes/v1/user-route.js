

const {userController} = require("../../controllers")



const router = require("express").Router()

router.post("/" , userController.RegisterUser)
router.get("/all" , userController.getAllUsers)
router.patch("/:id" , userController.updateById)

module.exports = router
