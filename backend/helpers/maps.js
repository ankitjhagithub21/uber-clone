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
    } catch (error) {
        console.log(error)
    }
}


const getDistanceAndTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required.');
    }



    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getAutocompleteSuggestions = async (query) => {
    if (!query) {
        throw new Error("Query is required for autocomplete suggestions.");
    }

    
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // View the suggestions
        return data;
    } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
    }
};



module.exports = {
    getAddressCoordinate,
    getDistanceAndTime,
    getAutocompleteSuggestions
}