

const express = require("express")
const { theaterController } = require("../../controllers")
const router = express.Router()


router.post("/" , theaterController.createTheater)
router.get("/" , theaterController.getAllTheaters)
router.get("/:id" , theaterController.getTheater)
router.patch("/:id" , theaterController.updateTheaterById)
router.delete("/:id" , theaterController.deleteTheaterById)



module.exports = router