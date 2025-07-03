const express=require('express');
const app=express();
require('./db')
require('dotenv').config();

//-------------------------------------------------------------------------//
app.use(express.json())


//-------------------------------TEST ROUTE--------------------------------//
app.get('/',(req,res)=>{
    res.send("Hello users")
})

//---------------------------------ROUTES----------------------------------//
const authRoutes=require('./routes/authRoutes.js')
app.use('/api/auth',authRoutes)

//-------------------------------------------------------------------------//

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})