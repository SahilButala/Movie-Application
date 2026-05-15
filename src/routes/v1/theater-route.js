

const express = require("express")
const { theaterController } = require("../../controllers")
const { authMiddleware } = require("../../middlewares")
const router = express.Router()


router.use(authMiddleware.authenticate)


router.post("/" , theaterController.createTheater)
router.get("/" , authMiddleware.isAdminOrClient , theaterController.getAllTheaters)
router.get("/:id" , theaterController.getTheater)
router.patch("/:id" , theaterController.updateTheaterById)
router.delete("/:id" , theaterController.deleteTheaterById)

// update theater  based on movie  
// mean for ex : Thane , inside lakeshore-mall there have to many movies that hoisted
router.patch("/:id/movies" , theaterController.updateMoviesInTheaters)
// get all movies that running in perticular theater
router.get("/:theaterId/movies" , theaterController.getMoviesInTheater)
router.get("/:theaterId/movies/:movieId" , theaterController.checkMovieInTheater)



module.exports = router