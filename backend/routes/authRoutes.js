const express = require('express');
const router = express.Router();
const User = require('./../models/User.js');
const {generateToken}=require('./../middleware/auth.js')

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();

        const payload={
            id: response.id,
            email: response.email
        }
        const token=generateToken(payload)
        res.status(200).json({response: response,token: token});
    } 
    catch (err) {
        console.error("Signup error:", err); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email})

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid email or password'})
        }

        const payload={
            id: user.id,
            email: user.email
        }
        const token=generateToken(payload)
        res.json({token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({err:"Internal Server Error"})
    }
})

module.exports = router;