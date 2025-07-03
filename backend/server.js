const express=require('express')
require('./db')
require('dotenv').config()

const app=express();
const port=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Hello users")
})

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})