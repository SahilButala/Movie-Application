const USER_STATUS = {
   approved : "APPROVED",
   pending : "PENDING",
   rejected : "REJECTED"
}

const USER_ROLE = {
    customer : "CUSTOMER",
    admin : "ADMIN",
    client : "CLIENT"
}

const BOOKING_STATUS = {
    cancelled : "CANCELLED",
    successFull : "SUCCESSFULL",
    proccessing : "IN_PROCESS"
}

const PAYMENT_STATUS = {
     sucess : "SUCESS",
     failed : "FAILED",
     pending : "PENDING"
}

module.exports = {
     USER_STATUS,
     USER_ROLE,
     BOOKING_STATUS,
     PAYMENT_STATUS
}