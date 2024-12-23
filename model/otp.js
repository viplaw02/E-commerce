const mongoose = require('mongoose');
const OtpSchema = new mongoose.Schema({
    email:{
        type:String,
        requird:true,
        unique:true
    },
    otp:{
        type:Number,
        required:true
        
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5
    },
    
})
const otp = mongoose.model('userotp',OtpSchema)
module.exports ={
    otp
}