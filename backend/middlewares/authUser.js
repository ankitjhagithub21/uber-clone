const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authUser = async(req,res,next) =>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({success:false,message:"Token missing."});
    }
    

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
        
    }catch(error){
        res.status(401).json({success:false,message:"Unauthorized."})
    }
}

module.exports = authUser