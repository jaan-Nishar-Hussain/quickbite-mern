const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin'); // Correctly importing your admin model

const privateKey = fs.readFileSync("./private.key", "utf8");

// Admin Register Function
const adminRegister = async (req, res) => {
    try {
        const { firstname, lastname, password, phone, email } = req.body;

        if (!email || !firstname || !lastname || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash Password
        const hash = bcrypt.hashSync(password, 10);

        // Create New Admin User
        const newAdmin = new admin({
            firstname,
            lastname,
            password: hash,
            phone,
            email,
        });

        const token = jwt.sign(
            { id: newAdmin._id, email },
            privateKey,
            { algorithm: "RS256", expiresIn: "24h" }
        );

        newAdmin.token = token;

        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully', token });
    } catch (error) {
        console.error('Error in register:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


const adminLogin = async (req, res) => {
    try {
        const { password, email } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingAdmin = await admin.findOne({ email });

        if (!existingAdmin) {
            return res.status(400).json({ message: 'Please enter a valid email' });
        }

        // Compare Password
        const isAuth = bcrypt.compareSync(password, existingAdmin.password);

        if (!isAuth) {
            return res.status(400).json({ message: 'Your password is incorrect' });
        }

        // Generate Token
        const token = jwt.sign(
            { id: existingAdmin._id, email },
            privateKey,
            { algorithm: "RS256", expiresIn: "24h" }
        );

        existingAdmin.token = token;

        await existingAdmin.save();

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    adminRegister,
    adminLogin,
};
