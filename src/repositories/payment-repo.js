const { paymentModel } = require("../models");
const CrudRepository = require("../repositories/crud-repo");



class PayMentRepo extends CrudRepository{
     constructor(){
         super(paymentModel)
     }

     async ProccedPayment(data){
         
     }
}

module.exports = PayMentRepo