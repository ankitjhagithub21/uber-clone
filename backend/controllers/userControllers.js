const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }


        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ success: false, message: "User already exist." })
        }


        if (name.length < 3) {
            return res.status(400).json({ success: false, message: "Name must be atleast 3 characters long." })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter valid email address." })
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ success: false, message: "Please enter strong password." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        const token = generateToken(savedUser._id)


        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000 //1 day
        }).status(201).json({
            success: true, message: "User registered successfully.", user: {
                name: savedUser.name,
                email: savedUser.email

            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }

        const userExist = await User.findOne({ email }).select("+password");

        if (!userExist) {
            return res.status(404).json({ success: false, message: "Wrong email or password." })
        }

        const validPassword = await bcrypt.compare(password, userExist.password)

        if (!validPassword) {
            return res.status(400).json({ success: false, message: "Wrong email or password." })
        }


        const token = generateToken(userExist._id)

        const user = {
            name: userExist.name,
            email: userExist.email
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000 //1 day
        }).status(200).json({ success: true, message: `Welcome back ${user.name}`, user })



    } catch (error) {

        res.status(500).json({ success: false, message: error.message })
    }
}

const getUserProfile = async (req, res) => {
    if(!req.user){
        return res.status(401).json({success:false,message:"Unauthorized."})
    }
    res.status(200).json({ success: true, user:req.user });
}

const logout = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0
    }).status(200).json({ success: true, message: "Logout successfull." })
}


module.exports = {
    login,
    register,
    getUserProfile,
    logout
}