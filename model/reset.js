const mongoose = require('mongoose');
exports.ResetToken = new mongoose.Schema({
     email:{
        type:String,
        requird:true,
     },
     token:{
       type:String,
       requird:true
     }
},{timestamps:true})