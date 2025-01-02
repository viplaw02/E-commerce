const  nodemailer = require('nodemailer')
const {otp} = require('../model/otp');
 const {HttpStatusCode}= require('axios')
 require('dotenv').config();
exports.SendMail = async (email,title,otp)=>{
 try {
     const transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        secure:true,
        auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
        }
     })
     const htmlbody=`
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTPMODEL</title>
    <style>
 .container{
    font-family: math;
    border: 1px solid;
    text-align: center;

 }
 .otp{
    text-align: center;
 }
    </style>
</head>
<body>
    <div class="container">
       <h1>Verification Code</h1>
   
    <div class="otp-container">
        <p>Thanks For Registering with us.Your Verification Code is:</p>
        <div class="otp">${otp}</div>
        <p>This code is valid for 5 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
    </div>
</div>
</body>
</html>
     `
     const Sendmail = await transporter.sendMail({
        from:process.env.MAIL_USER,
        to:email,
        subject:`${title}`,
        html:htmlbody
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