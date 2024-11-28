const express = require('express');
const { createRide } = require('../controllers/rideControllers');
const authUser = require('../middlewares/authUser');
const rideRouter = express.Router();

rideRouter.post("/create",authUser,createRide)


module.exports = rideRouter