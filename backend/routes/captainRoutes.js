const express = require('express');
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require('../controllers/captainControllers');
const authCaptain = require('../middlewares/authCaptain');
const captainRouter = express.Router();

captainRouter.post("/register",registerCaptain)
captainRouter.post("/login",loginCaptain)
captainRouter.get("/profile",authCaptain,getCaptainProfile)
captainRouter.get("/logout",logoutCaptain)

module.exports = captainRouter