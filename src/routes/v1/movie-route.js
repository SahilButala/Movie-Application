

const express = require("express")
const { movieController } = require("../../controllers")
const router = express.Router()


router.post("/" , movieController.createMovie)
router.get("/" , movieController.getAllMovies)




module.exports = router