const mongoose = require('mongoose')
const bcrypt= require('bcrypt');
const{HttpStatusCode} = require('axios')
const UserSchema = new mongoose.Schema({
    fullname:{
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
 const saltRound = 10;
 UserSchema.pre('save',async function(next){
  this.password = await bcrypt.hash(this.password,saltRound);
  next();
}
)
const User = mongoose.model('user',UserSchema)
module.exports = {
  User
}