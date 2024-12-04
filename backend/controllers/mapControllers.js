const { getAddressCoordinate, getAutocompleteSuggestions, calculateDistanceAndTime } = require("../helpers/maps");



const getCoordinates = async (req, res) => {
    const { address } = req.query;
    try {

        const coordinates = await getAddressCoordinate(address)

        res.status(200).json(coordinates)
    } catch (error) {
        
        res.status(500).json({ success: false, message: error.message })
    }
}

const getDistanceTime = async (req, res) => {
    const { origin, destination, vehicleType } = req.query;

    try {
        if (!origin || !destination || !vehicleType) {
            return res
                .status(400)
                .json({ success: false, message: "Origin, destination, and vehicle type are required." });
        }

        const data = await calculateDistanceAndTime(origin, destination, vehicleType);
        res.status(200).json({
            success: true,
            distance: `${data.distance} km`,
            time: `${data.time} minutes`,
            vehicleType,
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getSuggestions = async (req, res) => {
    const { input } = req.query;
    try {

        const data = await getAutocompleteSuggestions(input)
        res.status(200).json(data)

    } catch (error) {
       
        res.status(500).json({ success: false, message: error.message })
    }
}


module.exports = {
    getCoordinates,
    getDistanceTime,
    getSuggestions
}