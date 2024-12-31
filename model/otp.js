const mongoose = require('mongoose');
const {SendMail} = require('../util/SendEmail')
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
 verification = async (email,otp)=>{
  try {
     const response = await SendMail(email,"Verification from viplaw",otp);
     console.log("Mail Sent",response);
     
  } catch (error) {
    console.log("Getting an error while generating ",error.email);
    throw error;
  }
 }
 OtpSchema.pre('save',async (next)=>{
    try {
        await verification(this.email,this.otp);
    } catch (error) {
        console.log(error.message);
        next();
    }
 })
const otp = mongoose.model('userotp',OtpSchema)
module.exports ={
    otp
}