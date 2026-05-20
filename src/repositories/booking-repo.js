const { bookingModel } = require("../models");
const CrudRepository = require("../repositories/crud-repo");



class BookingRepo extends CrudRepository{
     constructor(){
         super(bookingModel)
     }

     async BookTicket(data){
         
     }
}

module.exports = BookingRepo