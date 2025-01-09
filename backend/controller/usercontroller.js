const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const privateKey = fs.readFileSync("./private.key", "utf8");


const register = async (req, res) => {
    try {
        const { firstname, lastname, password, phone, email} = req.body;

        
        if (!email || !firstname || !lastname || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        
        const hash = bcrypt.hashSync(password, 10);

        
        const newUser = new User({
            firstname,
            lastname,
            password: hash,
            phone,
            email,
        });

        
        const token = jwt.sign(
            { id: newUser._id, email },
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

const login = async (req, res) => {
    try {
        const { password, email } = req.body;

    
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: 'Please enter a valid email' });
        }

        
        const isAuth = bcrypt.compareSync(password, existingUser.password);

        if (!isAuth) {
            return res.status(400).json({ message: 'Your password is incorrect' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: existingUser._id, email },
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

module.exports = {
    register,
    login,
};
