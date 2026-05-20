

const express = require("express")
const { paymentController } = require("../../controllers")
const router = express.Router()


router.post("/" , paymentController.ProccedPayment)


module.exports = router