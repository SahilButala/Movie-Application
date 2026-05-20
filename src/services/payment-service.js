
const { PaymentRepo } = require("../repositories")


const paymentRepo = new PaymentRepo()
const proccedPayment =async  (data)=>{
   const payment = await paymentRepo.ProccedPayment(data)
   return payment
}


module.exports = {
     proccedPayment
}