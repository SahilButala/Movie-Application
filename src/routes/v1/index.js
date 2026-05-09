const express = require('express');
const router = express.Router();


// ----------------- DECLARE ROUTES -----------------//
const userRoute = require("./user-route")
const movieRoute  = require("./movie-route")
const theaterRoute  = require("./theater-route")

// ----------------- DECLARE ROUTES -----------------//



// ----------------- ROUTES -----------------//
router.use("/users", userRoute)
router.use("/movies" , movieRoute)
router.use("/theater" ,theaterRoute )
// ----------------- ROUTES -----------------//





module.exports = router;