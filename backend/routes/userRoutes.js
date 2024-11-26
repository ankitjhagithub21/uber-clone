const express = require('express');
const { register, login, getUserProfile } = require('../controllers/userControllers');
const verifyToken = require('../middlewares/verifyToken');
const userRouter = express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/profile",verifyToken,getUserProfile)

module.exports = userRouter