
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , "Please Provide a Valid Email"], // regex for email (validate email)
        lowercase : true,
        trim : true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: true
    },
    userRole: {
        type: String,
        required: true,
        default: "CUSTOMER",
        enums: ["CUSTOMER", "ADMIN"]
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED",
        enums: ["APPROVED", "REJECTED"]
    },


}, { timestamps: true })


const User = mongoose.model.Users || mongoose.model('User', userSchema);

module.exports = User;