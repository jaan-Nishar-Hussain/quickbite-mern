const adminMenu = require('../models/menu'); // Import Menu model
const adminResturant = require('../models/resturant'); // Import Restaurant model

// 📝 Create a new menu item
const createMenu = async (req, res) => {
    try {
        const { name, price, category, image, resturant, description, available } = req.body;

        // Validate input
        if (!name || !price || !category || !image || !description || !resturant) {
            return res.status(400).json({ message: 'Please enter all required menu details' });
        }

        // Check if restaurant exists
        const existingRestaurant = await adminResturant.findById(resturant);
        if (!existingRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Create new menu item
        const newMenu = new adminMenu({
            name,
            price,
            category,
            image,
            description,
            available: available !== undefined ? available : true,
            resturant
        });

        // Save the menu item to the database
        await newMenu.save();

        // Populate the resturant field
        const populatedMenu = await adminMenu.findById(newMenu._id).populate('resturant');

        // Send success response
        return res.status(201).json({
            message: 'Menu item created successfully',
            menu: populatedMenu
        });
    } catch (error) {
        console.error('Error creating menu:', error.message);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Export all functions


// 📝 Get all menu items
const getMenu = async (req, res) => {
    try {
        const menus = await adminMenu.find().populate('resturant');
        res.status(200).json(menus);
    } catch (error) {
        console.error('Error fetching menus:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// 📝 Delete a menu item
const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        await adminMenu.findByIdAndDelete(id);
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// 📝 Edit an existing menu item
const editMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMenu = await adminMenu.findByIdAndUpdate(id, req.body, { new: true }).populate('resturant');
        res.status(200).json({ message: 'Menu item updated successfully', menu: updatedMenu });
    } catch (error) {
        console.error('Error updating menu:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Export all functions
module.exports = { createMenu, editMenu, getMenu, deleteMenu };