const express=require('express');
const app=express();
require('./db')
require('dotenv').config();
const cors=require('cors')

//-------------------------------------------------------------------------//
app.use(express.json())
app.use(cors({
  origin: 'https://b2b-tender-hub.vercel.app',
  credentials: true
}));


//-------------------------------TEST ROUTE--------------------------------//
app.get('/',(req,res)=>{
    res.send("Hello users")
})

//---------------------------------ROUTES----------------------------------//
const authRoutes=require('./routes/authRoutes.js')
const companyRoutes=require('./routes/companyRoutes.js')
const tenderRoutes=require('./routes/tenderRoutes.js')
const applicationRoutes=require('./routes/applicationRoutes.js')

app.use('/api/auth',authRoutes)
app.use('/api/company',companyRoutes)
app.use('/api/tender',tenderRoutes)
app.use('/api/application',applicationRoutes)

//-------------------------------------------------------------------------//

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})