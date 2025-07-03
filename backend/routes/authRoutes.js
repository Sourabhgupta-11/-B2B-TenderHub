const express = require('express');
const router = express.Router();
const User = require('./../models/User.js');


router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();
        res.status(200).json({ response });
    } catch (err) {
        console.error("Signup error:", err); // 👈 log the actual error
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
    }
    catch(err){
        res.status(500).json({err:"Internal Server Error"})
    }
})

module.exports = router;