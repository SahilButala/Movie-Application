const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");
const catchAsync = require("../utils/catch-async");
const ApiRes = require("../utils/api-response")



const BookTicket = catchAsync(async (req , res , next)=>{
  const bookingTic = await BookingService.BookTicket()
  res.status(StatusCodes.CREATED).json(new ApiRes(StatusCodes.CREATED , true , "Ticket Book Successfully.." , bookingTic))
})

module.exports = {
     BookTicket
}