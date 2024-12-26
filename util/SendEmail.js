const  nodemailer = require('nodemailer')
const {otp} = require('../model/otp');
exports.SendMail = async (email,title,otp)=>{
 try {
     const Transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        port:process.env.MAIL_PORT,
        secure:true,
        auth:({
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
        })
     })

 } catch (error) {
    
 }


} 