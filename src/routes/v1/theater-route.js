

const express = require("express")
const { theaterController } = require("../../controllers")
const router = express.Router()


router.post("/" , theaterController.createTheater)
router.get("/" , theaterController.getAllTheaters)
router.get("/:id" , theaterController.getTheater)
router.patch("/:id" , theaterController.updateTheaterById)
router.delete("/:id" , theaterController.deleteTheaterById)

// search movies based on theater or get all movies based on theater 
// mean for ex : Thane , inside lakeshore-mall there have to many movies that hoisted
router.patch("/:id/movies" , theaterController.updateMoviesInTheaters)



module.exports = router