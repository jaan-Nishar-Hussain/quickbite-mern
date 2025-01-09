const Order = require('../models/order');
const Menu = require('../models/menu'); // Ensure Menu model is imported

const createOrder = async (req, res) => {
    try {
        const { customerId, restaurantId, items, deliveryAddress } = req.body;

        if (!customerId || !restaurantId || !items || items.length === 0 || !deliveryAddress) {
            return res.status(400).json({ message: 'Please provide all required fields properly.' });
        }

        let totalPrice = 0;

        // Enrich items with price from Menu
        const enrichedItems = await Promise.all(items.map(async (item) => {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) {
                throw new Error(`Menu item with ID ${item.menuItemId} not found`);
            }
            const itemPrice = menuItem.price * item.quantity;
            totalPrice += itemPrice;
            return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: menuItem.price
            };
        }));

        const newOrder = new Order({
            customerId,
            restaurantId,
            items: enrichedItems,
            totalPrice,
            deliveryAddress,
            paymentStatus: 'pending',
            orderStatus: 'pending'
        });

        await newOrder.save();

        return res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });
    } catch (error) {
        console.error('Error creating order:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 🛠️ Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId').populate('restaurantId').populate('items.menuItemId');

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        return res.status(200).json({
            message: 'Orders fetched successfully',
            orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 🛠️ Get a specific order by ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)
            .populate('customerId')
            .populate('restaurantId')
            .populate('items.menuItemId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({
            message: 'Order fetched successfully',
            order
        });
    } catch (error) {
        console.error('Error fetching order:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 🛠️ Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { customerId, restaurantId, items, deliveryAddress, orderStatus, paymentStatus } = req.body;

        if (!customerId || !restaurantId || !items || items.length === 0 || !deliveryAddress) {
            return res.status(400).json({ message: 'Please provide all required fields properly.' });
        }

        let totalPrice = 0;

        // Enrich items with price from Menu
        const enrichedItems = await Promise.all(items.map(async (item) => {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) {
                throw new Error(`Menu item with ID ${item.menuItemId} not found`);
            }
            const itemPrice = menuItem.price * item.quantity;
            totalPrice += itemPrice;
            return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: menuItem.price
            };
        }));

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { customerId, restaurantId, items: enrichedItems, totalPrice, deliveryAddress, orderStatus, paymentStatus },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({
            message: 'Order updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        console.error('Error updating order:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 🛠️ Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({
            message: 'Order deleted successfully',
            order: deletedOrder
        });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};
