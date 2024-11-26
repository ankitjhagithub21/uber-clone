const express = require('express');
const { register, login, getUserProfile, logout } = require('../controllers/userControllers');
const verifyToken = require('../middlewares/verifyToken');
const userRouter = express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/profile",verifyToken,getUserProfile)
userRouter.get("/logout",logout)

module.exports = userRouter