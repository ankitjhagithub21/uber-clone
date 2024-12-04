const apiKey = process.env.GOOGLE_MAPS_API;

const getAddressCoordinate = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data || !data.results || data.results.length === 0) {
            throw new Error("No results found for the provided address.");
        }

        const location = data.results[0].geometry.location;
        return {
            lat: location.lat,
            lng: location.lng,
        };
        
    } catch (error) {
        console.error("Error fetching address coordinates:", error.message);
        throw new Error("Failed to retrieve address coordinates.");
    }
};

const calculateDistanceAndTime = async (pickup, destination, vehicleType) => {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination addresses are required.");
    }

    try {
        const vehicleSpeeds = {
            car: 50,
            auto: 30,
            motorcycle: 40,
        };

        const averageSpeed = vehicleSpeeds[vehicleType.toLowerCase()];
        if (!averageSpeed) {
            throw new Error("Invalid vehicle type. Valid options are: car, auto, motorcycle.");
        }

        const pickupCoordinates = await getAddressCoordinate(pickup);
        const destinationCoordinates = await getAddressCoordinate(destination);

        const toRadians = (degrees) => degrees * (Math.PI / 180);
        const { lat: lat1, lng: lon1 } = pickupCoordinates;
        const { lat: lat2, lng: lon2 } = destinationCoordinates;

        const R = 6371; // Radius of the Earth in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        const timeInMinutes = (distance / averageSpeed) * 60; // Time in minutes

        return {
            distance: Math.round(distance * 100) / 100,
            time: Math.round(timeInMinutes * 100) / 100,
        };
    } catch (error) {
        console.error("Error in calculateDistanceAndTime:", error.message);
        throw new Error("Failed to calculate distance and time.");
    }
};

const calculateFare = async (pickup, destination, vehicleType) => {
    if (!pickup || !destination || !vehicleType) {
        throw new Error("Pickup, destination, and vehicle type are required.");
    }

    const rates = {
        car: { baseFare: 50, perKm: 12, perMin: 3 },
        auto: { baseFare: 30, perKm: 8, perMin: 2 },
        motorcycle: { baseFare: 20, perKm: 5, perMin: 1 },
    };

    const selectedRate = rates[vehicleType.toLowerCase()];
    if (!selectedRate) {
        throw new Error("Invalid vehicle type. Choose from car, auto, or motorcycle.");
    }

    try {
        const data = await calculateDistanceAndTime(pickup, destination, vehicleType);
        const fare =
            selectedRate.baseFare +
            data.distance * selectedRate.perKm +
            data.time * selectedRate.perMin;

        return Math.round(fare * 100) / 100;
    } catch (error) {
        console.error("Error in calculateFare:", error.message);
        throw new Error("Failed to calculate fare.");
    }
};

const getAutocompleteSuggestions = async (query) => {
    if (!query) {
        throw new Error("Query is required for autocomplete suggestions.");
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_SUGG_API}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data || !data.predictions) {
            throw new Error("No suggestions found.");
        }

        return data.predictions.map((prediction) => ({
            description: prediction.description,
            placeId: prediction.place_id,
        }));
    } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error.message);
        throw new Error("Failed to fetch autocomplete suggestions.");
    }
};

module.exports = {
    getAddressCoordinate,
    calculateDistanceAndTime,
    calculateFare,
    getAutocompleteSuggestions,
};
