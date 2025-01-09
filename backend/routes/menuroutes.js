const express = require('express');
const { createMenu, editMenu, getMenu, deleteMenu } = require('../controller/menucontroller');
const { protect } = require('../middleware/middle');

const menuRouter = express.Router();

menuRouter.post('/adminpost', protect, createMenu);
menuRouter.put('/edit/:id', protect, editMenu);
menuRouter.get('/getall', getMenu); // Public route
menuRouter.delete('/delete/:id', protect, deleteMenu);

module.exports = menuRouter;
