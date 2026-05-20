
const mongoose  = require("mongoose")

const BookingSchema = new mongoose.Schema({
    theaterId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Theater",
        required : true
    },
    movieId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Movies",
        required : true
    },
    userId : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "User",
         required : true
    },
    timing : {
        type : String,
        required : [true , "Timing is Missing"]
    },
    noOfSeats : {
        type : Number,
        required : true,
        default : 0
    },
    totalCost : {
       type : Number,
       default : 0
    },
    status : {
         type : String,
         required : true,
         enum : {
             values : ["In_PROCESS" , "CANCELLED" , "SUCCESSFULL"],
             message : "In-Valid Booking Status"
         },
         default : "IN_PROCESS"
    },
 
} , {timestamps : true})

const BookingModel = mongoose.model.BookingModel || mongoose.model("BookingModel" , BookingSchema)

module.exports = BookingModel