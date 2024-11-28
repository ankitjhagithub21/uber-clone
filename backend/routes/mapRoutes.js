const express = require('express');
const authUser = require('../middlewares/authUser');
const { getCoordinates, getDistanceTime, getSuggestions } = require('../controllers/mapControllers');
const mapRouter = express.Router();

mapRouter.get('/get-coordinates',authUser,getCoordinates)
mapRouter.get('/get-distance-time',authUser,getDistanceTime)
mapRouter.get('/get-suggestions',authUser,getSuggestions)

module.exports = mapRouter