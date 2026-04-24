const express = require('express');
const router = express.Router();


// ----------------- DECLARE ROUTES -----------------//
const userRoute = require("./user-route")
const movieRoute  = require("./movie-route")

// ----------------- DECLARE ROUTES -----------------//



// ----------------- ROUTES -----------------//
router.use("/users", userRoute)
router.use("/movies" , movieRoute)
// ----------------- ROUTES -----------------//





module.exports = router;