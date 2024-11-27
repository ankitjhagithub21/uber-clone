const express = require('express');
const { registerCaptain } = require('../controllers/captainControllers');
const captainRouter = express.Router();

captainRouter.post("/register",registerCaptain)

module.exports = captainRouter