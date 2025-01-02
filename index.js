
const express = require('express');
const app = express();
const DbConnect = require('./config/Dbconnect').DbConnect()
const AllRoutes = require('./Routes/AllRoutes')
require('dotenv').config();
app.use(express.json())
PORT = process.env.PORT||4000
app.get('/',(req,res)=>{
    res.send('<h1>Welcome to e-commerse</h1>')
})
app.use('/api/v1',AllRoutes);

app.listen(PORT,()=>{
 console.log(`sever has been running at this port ${PORT}`);
 
})
