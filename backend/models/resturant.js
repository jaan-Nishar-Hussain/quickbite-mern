const mongoose = require('mongoose');

const resturantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Resturant', resturantSchema); // Export Restaurant model
