const express = require('express');
const router = express.Router();
 const{SendOtp} = require('../controllers/Signup')
router.post('/sendotp',SendOtp)