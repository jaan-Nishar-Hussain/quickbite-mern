const adminMenu = require('../models/menu'); // Correct import

// 📝 Create a new menu item
const createMenu = async (req, res) => {
    try {
        const { name, price, category, image, restaurant, description, available } = req.body;

        console.log('Request body:', req.body); // Log the request body

        if (!name || !price || !category || !image || !description || !restaurant) {
            return res.status(400).json({ message: 'Please enter all required menu details' });
        }

        const newMenu = new adminMenu({
            name,
            price,
            category,
            image,
            description,
            available: available !== undefined ? available : true,
            restaurant
        });

        await newMenu.save();

        return res.status(201).json({
            message: 'Menu item created successfully',
            menu: newMenu
        });
    } catch (error) {
        console.error('Error creating menu:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 📝 Edit an existing menu item
const editMenu = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedMenu = await adminMenu.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedMenu) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        return res.status(200).json({
            message: 'Menu item updated successfully',
            menu: updatedMenu
        });
    } catch (error) {
        console.error('Error editing menu:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 📝 Get all menu items
const getMenu = async (req, res) => {
    try {
        const menu = await adminMenu.find();

        if (!menu || menu.length === 0) {
            return res.status(404).json({ message: 'No menu items found' });
        }

        return res.status(200).json({
            message: 'Menu items retrieved successfully',
            menu
        });
    } catch (error) {
        console.error('Error fetching menu:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 📝 Delete a menu item
const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMenu = await adminMenu.findByIdAndDelete(id);

        if (!deletedMenu) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        return res.status(200).json({
            message: 'Menu item deleted successfully',
            menu: deletedMenu
        });
    } catch (error) {
        console.error('Error deleting menu:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};


module.exports = { createMenu, editMenu, getMenu, deleteMenu };
