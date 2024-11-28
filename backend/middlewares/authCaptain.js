const jwt = require('jsonwebtoken');
const Captain = require('../models/Captain');

const authCaptain = async(req,res,next) =>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized."});
    }
    

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await Captain.findById(decoded.id);
        req.captain = captain;
        next();
        
    }catch(error){
        res.status(401).json({success:false,message:"Unauthorized."})
    }
}

module.exports = authCaptain