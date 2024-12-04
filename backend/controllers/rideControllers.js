const { calculateFare } = require("../helpers/maps");
const Ride = require("../models/Ride");
const crypto = require("crypto");

const genOtp = (num) => {
    return crypto
        .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
        .toString();
};

const getFare = async (req, res) => {
    const { pickup, destination } = req.body;

    try {
        if (!pickup || !destination) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required." });
        }

        // Calculate fares for each vehicle type
        const carFare = await calculateFare(pickup, destination, "car");
        const autoFare = await calculateFare(pickup, destination, "auto");
        const motorcycleFare = await calculateFare(pickup, destination, "motorcycle");

        // Combine fares into a response object
        const fares = {
            car: carFare,
            auto: autoFare,
            motorcycle: motorcycleFare,
        };

        // Respond with the fares
        res.status(200).json({ success: true, fares });
    } catch (error) {
        console.error("Error in getFare:", error.message);
        res
            .status(500)
            .json({ success: false, message: "Failed to calculate fare." });
    }
};


const createRide = async (req, res) => {
    const { pickup, destination, vehicleType } = req.body;

    try {
        if (!pickup || !destination || !vehicleType) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required." });
        }

        const fare = await calculateFare(pickup, destination, vehicleType);

        const ride = await Ride.create({
            user: req.user._id,
            pickup,
            destination,
            otp: genOtp(6),
            fare,
        });

        res.status(201).json({ success: true, ride });
    } catch (error) {
        console.error("Error in createRide:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getFare,
    createRide,
};
