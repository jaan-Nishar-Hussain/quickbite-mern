const express = require('express');
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} = require('../controller/ordercontroller');

const orderRouter = express.Router();


orderRouter.post('/create', createOrder);
orderRouter.get('/all', getAllOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.put('/update/:id', updateOrderStatus);
orderRouter.delete('/delete/:id', deleteOrder);

module.exports = orderRouter;
