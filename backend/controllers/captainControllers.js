const Captain = require('../models/Captain')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const generateToken = (CaptainId) => {
    return jwt.sign({ id: CaptainId }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

const registerCaptain = async (req, res) => {
    try {
        const { name, email, password, color, plate, capacity, vehicleType } = req.body;

        if (!name || !email || !password || !color || !plate || !capacity || !vehicleType) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }


        const captain = await Captain.findOne({ email })

        if (captain) {
            return res.status(400).json({ success: false, message: "Captain already exist." })
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

        const newCaptain = new Captain({
            name,
            email,
            password: hashedPassword,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }

        })

        const savedCaptain = await newCaptain.save()

        const token = generateToken(savedCaptain._id)


        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000 //1 day
        }).status(201).json({ success: true, message: "Captain registered successfully." ,captain:{
            name:savedCaptain.name,
            email:savedCaptain.email,
        }})

    } catch (error) {

        res.status(500).json({ success: false, message: "Server error." })
    }
}


const loginCaptain = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }

        const captainExist = await Captain.findOne({ email }).select("+password");

        if (!captainExist) {
            return res.status(404).json({ success: false, message: "Wrong email or password." })
        }

        const validPassword = await bcrypt.compare(password, captainExist.password)

        if (!validPassword) {
            return res.status(400).json({ success: false, message: "Wrong email or password.",token })
        }


        const token = generateToken(captainExist._id)

        const captain = {
            name:captainExist.name,
            email:captainExist.email
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000 //1 day
        }).status(200).json({ success: true, message: `Welcome back ${captain.name}`,captain })


    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }
}

const getCaptainProfile = async (req, res) => {
    res.status(200).json({ success: true, captain: req.captain });
}

const logoutCaptain = (req, res) => {
    try {

        res.cookie('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0
        }).status(200).json({ success: true, message: "Logout Successfull." })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }
}


module.exports = {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain
}