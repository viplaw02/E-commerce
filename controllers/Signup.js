const {User} = require('../model/user');
const {otp} = require('../model/otp');
const crypto = require('crypto')
const {HttpStatusCode}=require('axios')
exports.SendOtp =(req,res)=>{
    try {
        const {email} = req.body;
         if(!email){
            return res.status(HttpStatusCode.NotFound).json({
                success:false,
                message:"email not found"
            });
         }
         const IsFoundEmail = otp.findOne({email})
         if(!IsFoundEmail){
            return res.status(HttpStatusCode.NotFound).json({
                success:false,
                message:`otp already send on ${email} `
            })
         }
       const GenerateOtp = ()=>{
        let otp = crypto.randomInt(10000,10000)
        return otp;
       }
       let UniqueOtp = false
       let emailOtp;
       while(!UniqueOtp){
        emailOtp = GenerateOtp();
        const FindOtp = otp.findOne({otp:emailOtp});
        if(!FindOtp){
            UniqueOtp=true;
        }
       }
     

    } catch (error) {
        
    }
}