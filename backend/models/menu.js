const mongoose = require('mongoose'); // Ensure mongoose is imported

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, default: true },
    resturant: { type: mongoose.Schema.Types.ObjectId, ref: 'Resturant', required: true } // Correctly reference 'Resturant' model
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema); // Export Menu model
