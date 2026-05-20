
const mongoose = require("mongoose")

const PaymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookingModel",
        required: [true, "Required Booking Id To Procced Payment"]
    },
    status: {
        required: true,
        type: String,
        enum: {
            values: ["SUCESS", "FAILED", "PENDING"],
            message : "Invalid Payment Status"
        }
    },
    amount: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const PaymentModel = mongoose.model.Payment || mongoose.model("Payment", PaymentSchema)

module.exports = PaymentModel