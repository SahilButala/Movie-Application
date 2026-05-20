

const express = require("express")
const { bookingController } = require("../../controllers")
const router = express.Router()


router.post("/" , bookingController.BookTicket)


module.exports = router