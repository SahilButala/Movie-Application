const mongoose = require("mongoose")



const theaterSchema = new mongoose.Schema({
     name : {
         type : String,
         required : true
     },
     description : {
         type : String,
     },
     city : {
         type : String,
         required : true
     },
     pincode : {
         type : Number,
         required : true
     },
     address : String
} , {
    timestamps : true
})


const theaterModel = mongoose.model.theater || mongoose.model("Theater" , theaterSchema)

module.exports = theaterModel