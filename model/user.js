const mongoose = require('mongoose')
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
 const salt =  10;
 UserSchema.pre('save',(next)=>{
    
 })
const user = mongoose.model('user',UserSchema)