const express = require('express');
const router = express.Router();


// ----------------- DECLARE ROUTES -----------------//
const userRoute = require("./user-route")
const movieRoute = require("./movie-route")
const theaterRoute = require("./theater-route")
const bookingRoute = require("./booking-route")
const paymentRoute = require("./payment-route")

// ----------------- DECLARE ROUTES -----------------//



// ----------------- ROUTES -----------------//
router.use("/auth", userRoute)
router.use("/movies", movieRoute)
router.use("/theater", theaterRoute)
router.use("/booking", bookingRoute)
router.use("/payment", paymentRoute)
// ----------------- ROUTES -----------------//





module.exports = router;