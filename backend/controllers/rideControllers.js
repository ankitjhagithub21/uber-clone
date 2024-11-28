const { getDistanceAndTime } = require("../helpers/maps");
const Ride = require("../models/Ride");


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
       
        const data = await getDistanceAndTime(pickup,destination);

        if (data.status !== "OK") {
            throw new Error(data.error_message || "Error fetching distance and time from Google Maps.");
        }

        const element = data.rows[0].elements[0];
        if (element.status !== "OK") {
            throw new Error("Invalid pickup or destination.");
        }

        // Extract distance and duration
        const distanceInKm = element.distance.value / 1000; // Convert meters to kilometers
        const timeInMinutes = element.duration.value / 60; // Convert seconds to minutes

        // Calculate fare
        const fare =
            selectedRate.baseFare +
            distanceInKm * selectedRate.perKm +
            timeInMinutes * selectedRate.perMin;

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
            vehicleType,
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
