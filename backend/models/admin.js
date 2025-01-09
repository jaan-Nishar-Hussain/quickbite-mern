const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { 
        type: String, 
        required: true,
    },
    token: { type: String },
    address: { type: String }, 
}, { timestamps: true }); 

module.exports = mongoose.model('adminUser', adminSchema);
