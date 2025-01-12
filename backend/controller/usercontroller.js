const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Menu = require('../models/menu');
const Resturant = require('../models/resturant');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, '../private.key'), 'utf-8');

// 📝 Register a new user
const register = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password, address } = req.body;

        // Validate input
        if (!firstname || !lastname || !email || !phone || !password || !address) {
            return res.status(400).json({ message: 'Please enter all required details' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword,
            address
        });

        // Save user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            privateKey,
            { algorithm: "RS256", expiresIn: "24h" }
        );

        newUser.token = token;

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error in register:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// 📝 Login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all required details' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            privateKey,
            { algorithm: "RS256", expiresIn: "24h" }
        );

        existingUser.token = token;

        await existingUser.save();

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// 📝 Get all menu items
const getMenu = async (req, res) => {
    try {
        const menus = await Menu.find().populate('resturant');
        res.status(200).json(menus);
    } catch (error) {
        console.error('Error fetching menus:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// 📝 Get all restaurants
const getResturants = async (req, res) => {
    try {
        const resturants = await Resturant.find();
        res.status(200).json(resturants);
    } catch (error) {
        console.error('Error fetching resturants:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    register,
    login,
    getMenu,
    getResturants,
};