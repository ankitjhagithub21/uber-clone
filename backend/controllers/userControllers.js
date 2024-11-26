const register = async(req,res) =>{
    try{

    }catch(error){
        res.status(500).json({success:false,message:"Server error."})
    }
}


const login = async(req,res) =>{
    try{

    }catch(error){
        res.status(500).json({success:false,message:"Server error."})
    }
}

module.exports = {
    login,
    register
}