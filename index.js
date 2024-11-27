
const express = require('express');
const app = express();
const DbConnect = require('./config/Dbconnect').DbConnect()
require('dotenv').config();
PORT = process.env.PORT||4000
app.get('/',(req,res)=>{
    res.send('<h1>Welcome to e-commerse</h1>')
})

app.listen(PORT,()=>{
 console.log(`sever has been running at this port ${PORT}`);
 
})
