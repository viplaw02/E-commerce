const { User } = require('../model/user');
const { Otp } = require('../model/otp');
const crypto = require('crypto');
const { HttpStatusCode } = require('axios');

exports.SendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(HttpStatusCode.BadRequest).json({
                success: false,
                message: "Email is required",
            });
        }

       

        // Check if OTP already sent
        const IsFoundEmail = await Otp.findOne({ email });
        if (IsFoundEmail) {
            return res.status(HttpStatusCode.BadRequest).json({
                success: false,
                message: `OTP already sent to ${email}`,
            });
        }

       
        const GenerateOtp = () => crypto.randomInt(10000, 100000);

        let UniqueOtp = false;
        let emailOtp;

        // Generate a unique OTP
        while (!UniqueOtp) {
            emailOtp = GenerateOtp();
            const FindOtp = await Otp.findOne({ otp: emailOtp });
            if (!FindOtp) {
                UniqueOtp = true;
            }
        }

        // Save OTP to the database
        const OtpPayload = new Otp({ email, otp: emailOtp });
        await OtpPayload.save();

        

     

        return res.status(HttpStatusCode.Ok).json({
            success: true,
            message: `OTP successfully sent to ${email}`,
        });
    } catch (error) {
        console.error("Error sending OTP:", error.message);
        return res.status(HttpStatusCode.InternalServerError).json({
            success: false,
            message: `Internal server error: ${error.message}`,
        });
    }
};
//........verifyOtp........................
