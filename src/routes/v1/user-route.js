

const {userController} = require("../../controllers")



const router = require("express").Router()

router.post("/register" , userController.RegisterUser)
router.post("/login" , userController.LoginUser)
router.get("/all" , userController.getAllUsers)
router.get("/:id" , userController.getUserById)
router.patch("/:id" , userController.updateById)

module.exports = router
