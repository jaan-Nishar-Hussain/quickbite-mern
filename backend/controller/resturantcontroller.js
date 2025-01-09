const adminResturant = require('../models/resturant'); // Ensure correct import

// 🛠️ Create a new restaurant
const createResturant = async (req, res) => {
    try {
        const { name, image, location, description } = req.body;

        // Validate required fields
        if (!name || !image || !location ||  !description ) {
            return res.status(400).json({ message: 'Please provide all required fields properly.' });
        }

        // Create a new restaurant document
        const newResturant = new adminResturant({
            name,
            image,
            location,
            description
        });

        // Save the document to the database
        await newResturant.save();

        // Send a success response
        return res.status(201).json({
            message: 'Restaurant added successfully',
            restaurant: newResturant
        });
    } catch (error) {
        console.error('Error creating restaurant:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 🛠️ Edit an existing restaurant
const editResturant = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedResturant = await adminResturant.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedResturant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        return res.status(200).json({
            message: 'Restaurant updated successfully',
            restaurant: updatedResturant
        });
    } catch (error) {
        console.error('Error editing restaurant:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 🛠️ Fetch all restaurants
const allResturant = async (req, res) => {
    try {
        const resturants = await adminResturant.find();

        if (!resturants || resturants.length === 0) {
            return res.status(404).json({ message: 'No restaurants found' });
        }

        return res.status(200).json({
            message: 'Restaurants fetched successfully',
            restaurants: resturants
        });
    } catch (error) {
        console.error('Error fetching restaurants:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

// 🛠️ Delete a restaurant
const deleteResturant = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedResturant = await adminResturant.findByIdAndDelete(id);

        if (!deletedResturant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        return res.status(200).json({
            message: 'Restaurant deleted successfully',
            restaurant: deletedResturant
        });
    } catch (error) {
        console.error('Error deleting restaurant:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = { createResturant, editResturant, deleteResturant, allResturant };
