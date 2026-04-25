

const express = require("express")
const { movieController } = require("../../controllers")
const router = express.Router()


router.post("/" , movieController.createMovie)
router.get("/" , movieController.getAllMovies)
router.get("/:id" , movieController.getMovieById)
router.patch("/:id" , movieController.updateMovie)
router.delete("/:id" , movieController.deleteMovie)





module.exports = router