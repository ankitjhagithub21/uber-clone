const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;

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

module.exports = getAddressCoordinate