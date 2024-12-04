const express = require('express');
const { createRide, getFare } = require('../controllers/rideControllers');
const authUser = require('../middlewares/authUser');
const rideRouter = express.Router();

rideRouter.post("/create",authUser,createRide)
rideRouter.post("/get-fare",authUser,getFare)


module.exports = rideRouter