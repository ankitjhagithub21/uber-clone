const express = require('express');
const { register, login, getUserProfile, logout } = require('../controllers/userControllers');
const authUser = require('../middlewares/authUser');
const userRouter = express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/profile",authUser,getUserProfile)
userRouter.get("/logout",logout)

module.exports = userRouter