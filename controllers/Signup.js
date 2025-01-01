const {User} = require('../model/user');
const {otp} = require('../model/otp');
const {HttpStatusCode}=require('axios')
exports.GenerateOtp =(req,res)=>{
    try {
        const {email} = req.body;
         if(!email){
            return res.status(HttpStatusCode.NotFound).json({
                success:false,
                message:"email not found"
            });
         }
         
    } catch (error) {
        
    }
}