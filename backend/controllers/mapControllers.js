const getAddressCoordinate = require("../helpers/getAddressCoordinate");
const getDistanceAndTime = require("../helpers/getDistanceAndTime");

const getCoordinates = async(req,res) =>{
   const {address} = req.query;
    try{
        
       const coordinates = await getAddressCoordinate(address)
     
        res.status(200).json(coordinates)
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}

const getDistanceTime = async(req,res) =>{
    const {origin,destination} = req.query;
     try{
        
        const data = await getDistanceAndTime(origin,destination)
        res.status(200).json(data)

     }catch(error){
         console.log(error)
         res.status(500).json({success:false,message:error.message})
     }
 }

module.exports = {
    getCoordinates,
    getDistanceTime
}