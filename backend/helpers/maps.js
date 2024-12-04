const apiKey = process.env.GOOGLE_MAPS_API;

const getAddressCoordinate = async (address) => {


    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    try {
        const res = await fetch(url)
        const data = await res.json()
       
        const location = data.results[0].geometry.location
        return {
            ltd: location.lat,
            lng: location.lng
        };
        return data;
    } catch (error) {
        console.log(error)
    }
}




const calculateDistanceAndTime = async (pickup, destination, vehicleType) => {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination addresses are required.");
    }

    try {
        // Speeds for different vehicle types (in km/h)
        const vehicleSpeeds = {
            car: 50,
            auto: 30,
            motorcycle: 40,
        };

        const averageSpeed = vehicleSpeeds[vehicleType.toLowerCase()];
        if (!averageSpeed) {
            throw new Error("Invalid vehicle type. Valid options are: car, auto, motorcycle.");
        }

        // Get coordinates of pickup and destination addresses
        const pickupCoordinates = await getAddressCoordinate(pickup);
        const destinationCoordinates = await getAddressCoordinate(destination);

        if (!pickupCoordinates || !destinationCoordinates) {
            throw new Error("Failed to retrieve coordinates for one or both addresses.");
        }

        const toRadians = (degrees) => degrees * (Math.PI / 180);

        // Destructure latitudes and longitudes
        const { ltd: lat1, lng: lon1 } = pickupCoordinates;
        const { ltd: lat2, lng: lon2 } = destinationCoordinates;

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
            distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
            time: Math.round(timeInMinutes * 100) / 100, // Round to 2 decimal places
        };
    } catch (error) {
        console.error("Error in calculateDistanceAndTime:", error.message);
        throw new Error("Failed to calculate distance and time.");
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

        // Extracting suggestions
        const suggestions = data.predictions.map((prediction) => ({
            description: prediction.description,
            placeId: prediction.place_id, // Useful for further queries like geocoding
        }));

        return suggestions;
    } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        throw new Error("Failed to fetch autocomplete suggestions.");
    }
};




module.exports = {
    getAddressCoordinate,
    calculateDistanceAndTime,
    getAutocompleteSuggestions,
};
