const express = require('express');

const {
  createResturant,
  editResturant,
  deleteResturant,
  allResturant,
} = require('../controller/resturantcontroller');

const { protect } = require('../middleware/middle'); // Ensure protect is imported correctly

const resturantRouter = express.Router();

// Use 'protect' instead of 'Protect'
resturantRouter.post('/postresturant', protect, createResturant);
resturantRouter.put('/editresturant/:id', protect, editResturant);
resturantRouter.delete('/deleteresturant/:id', protect, deleteResturant);
resturantRouter.get('/getresturant', allResturant);

module.exports = resturantRouter;
