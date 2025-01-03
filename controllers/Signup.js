const { User } = require('../model/user');
const { Otp } = require('../model/otp');
const crypto = require('crypto');
const { HttpStatusCode, create } = require('axios');


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
exports.verifyOtp = async (req,res)=>{
    try {
        
    const {otp} = req.body;
  
    if(!otp){
        return res.status(HttpStatusCode.BadRequest).json({
            success:false,
            message:"Please enter a  otp"
        })

    }
        let recentOtp = await Otp.findOne({otp}).sort({createdAt:-1}).limit(1);
        if(otp!==recentOtp.otp){
            return res.status(HttpStatusCode.BadRequest).json({
                success:false,
                message:"please enter valid Otp"
            });

        }
        return res.status(HttpStatusCode.Ok).json({
            success:true,
            message:"Successfully verifyed otp"
        })
    } catch (error) {
        console.log(error.message);
        return res.status(HttpStatusCode.InternalServerError).json({
            success:false,
            message:`error ${error.message}` 
        })
        
    }
}
//........................... signup...........................................
exports.Signup = async (req,res)=>{
try {
    const{
        fullname,
        username,           
        email,
        password
    }=req.body
    
     if(!fullname||!username||!email||!password){
        return res.status(HttpStatusCode.BadRequest).json({
            success:true,
            message:"fill proper Credentials"
        })
     }
     const IsUserExits = await User.findOne({email});
     if(IsUserExits){
        return res.status(HttpStatusCode.BadRequest).json({
            success:true,
            message:"user already exits please login it"
        });
     }
     const NewUserPayload = new User({
        fullname,
        username,           
        email,
        password
     });
        const newUser = await NewUserPayload.save();
        if(newUser){
            return res.status(HttpStatusCode.Ok).json({
                success:true,
                message:"User successfully Signup."
            })
        }
    
} catch (error) {
    console.log(error.message);
    return res.status(HttpStatusCode.InternalServerError).json({
        success:true,
        message:`error ${error.message}`
    })
}
}
