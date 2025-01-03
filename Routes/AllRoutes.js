const express = require('express');
const router = express.Router();
const{SendOtp,verifyOtp,Signup} = require('../controllers/Signup')

router.post('/sendotp',SendOtp);
router.post('/verifyotp',verifyOtp);
router.post('/Signup',Signup);
module.exports = router;