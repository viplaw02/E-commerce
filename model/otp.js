const mongoose = require('mongoose');
const { SendMail } = require('../util/SendEmail');

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // Expires in 5 minutes
  },
});

// Function to send verification email
async function verification(email, otp) {
  try {
    const response = await SendMail(email, "Verification from Viplaw", otp);
    console.log("Mail Sent", response);
  } catch (error) {
    console.error("Error while sending email:", error.message);
    throw error;
  }
}
OtpSchema.pre('save', async function (next) {
  try {
    await verification(this.email, this.otp); 
    next();
  } catch (error) {
    console.error("Error in pre-save hook:", error.message);
    next(error); 
  }
});

const Otp = mongoose.model('UserOtp', OtpSchema);

module.exports = {
  Otp,
};
