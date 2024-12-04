const { calculateDistanceAndTime } = require("../helpers/maps");
const Ride = require("../models/Ride");
const crypto = require('crypto')


const genOtp = (num) =>{
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString()
    return otp;
}

const getFare = async (pickup, destination, vehicleType) => {
    if (!pickup || !destination || !vehicleType) {
        throw new Error("Pickup, destination, and vehicle type are required.");
    }

    // Rates for different vehicle types
    const rates = {
        car: { baseFare: 50, perKm: 12, perMin: 3 },
        auto: { baseFare: 30, perKm: 8, perMin: 2 },
        motorcycle: { baseFare: 20, perKm: 5, perMin: 1 }
    };

    const selectedRate = rates[vehicleType.toLowerCase()];
    if (!selectedRate) {
        throw new Error("Invalid vehicle type. Choose from car, auto, or motorcycle.");
    }

    

    try {
       
        const data = await calculateDistanceAndTime(pickup,destination,vehicleType);

    

        // Calculate fare
        const fare =
            selectedRate.baseFare +
            data.distance * selectedRate.perKm +
            data.time * selectedRate.perMin;

        return Math.round(fare * 100) / 100; // Round to 2 decimal places
    } catch (error) {
        console.error("Error in getFare:", error.message);
        throw new Error("Failed to calculate fare.");
    }
};

const createRide = async (req, res) => {
    const { pickup, destination, vehicleType } = req.body;

    try {
        if (!pickup || !destination || !vehicleType) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const fare = await getFare(pickup, destination, vehicleType);

        const ride = await Ride.create({
            user:req.user._id,
            pickup,
            destination,
            otp:genOtp(6),
            fare
        });

        res.status(201).json(ride);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createRide
};
