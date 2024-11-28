const getDistanceAndTime = async (origin,destination) => {

    if(!origin || !destination){
        throw new Error('Origin and destination are required.')
    }
    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origin=${encodeURIComponent(origin)}?destination=${encodeURIComponent(destination)}&key=${apiKey}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
       return data
    } catch (error) {
        console.log(error)
    }
}

module.exports = getDistanceAndTime