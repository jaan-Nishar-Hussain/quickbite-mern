const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [
        {
            menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true } // Added price per item
        }
    ],
    totalPrice: { type: Number }, // Optional field for total order price
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderStatus: { type: String, enum: ['pending', 'preparing', 'delivered', 'cancelled'], default: 'pending' },
    deliveryAddress: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
