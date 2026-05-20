


const { StatusCodes } = require("http-status-codes");
const { PaymentService } = require("../services");
const catchAsync = require("../utils/catch-async");
const ApiRes = require("../utils/api-response")



const ProccedPayment = catchAsync(async (req , res , next)=>{
  const payement = await PaymentService.proccedPayment()
  res.status(StatusCodes.CREATED).json(new ApiRes(StatusCodes.CREATED , true , "Ticket Book Successfully.." , payement))
})

module.exports = {
     ProccedPayment
}