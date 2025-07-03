const jwt=require('jsonwebtoken')
require('dotenv').config();

const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET)
}

const jwtAuthMiddleware=(req,res,next)=>{

    const auth=req.headers.authorization
    if(!auth) return res.status(401).json({error: 'Token Not Found'})

    const token=req.headers.authorization.split(' ')[1];  //authorization is under header and in auth "bearer token" so to get token we do split and choose index 1 element that is token
    if(!token) return res.status(401).json({error: 'unauthorized'})

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).json({error:"Invalid Token"})
    }
}

module.exports = { generateToken, jwtAuthMiddleware };
