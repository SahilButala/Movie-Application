const { BookingRepo } = require("../repositories")


const bookingRepo = new BookingRepo()
const BookTicket =async  (data)=>{
   const bookingTic = await bookingRepo.BookTicket(data)
   return bookingTic
}


module.exports = {
     BookTicket
}