const express = require('express');
const authUser = require('../middlewares/authUser');
const { getCoordinates, getDistanceTime } = require('../controllers/mapControllers');
const mapRouter = express.Router();

mapRouter.get('/get-coordinates',authUser,getCoordinates)
mapRouter.get('/get-distance-time',authUser,getDistanceTime)

module.exports = mapRouter