const mongoose = require('mongoose')
const bcrypt= require('bcrypt');
const{HttpStatusCode} = require('axios')
const UserSchema = new mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true, 
        unique:true
    },
    password:{
        type:String,
        required:true 
    }
},{timestamp:true})
 const saltRound =  10;
 UserSchema.pre('save',async (next)=>{
  try {
    const password  = await bcrypt.hash(this.password,saltRound)
    next();
  } catch (error) {
    console.log(error.message);
    res.status(HttpStatusCode.BadRequest).json({
      success:false,
      message:"error while encrypting password"
    })
  }
 });
const user = mongoose.model('user',UserSchema)