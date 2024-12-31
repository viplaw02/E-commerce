const  nodemailer = require('nodemailer')
const {otp} = require('../model/otp');
 const {HttpStatusCode}= require('axios')
 require('dotenv').config();
exports.SendMail = async (email,title,body)=>{
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
     const Sendmail = await Transporter.sendMail({
        from:process.env.MAIL_USER,
        to:email,
        subject:title,
        html:`${body}`
     })
    console.log("send mail",Sendmail);
    return Sendmail;
 } catch (error) {
    console.log(error.message);
    return res.status(HttpStatusCode.InternalServerError).json({
        success:false,
       message:`Internal Server error ${error.message}`
    })
 }
} 