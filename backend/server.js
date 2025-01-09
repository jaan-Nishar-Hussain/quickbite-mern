const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./routes/userroutes');
const adminRouter = require('./routes/adminroutes');
const menuRouter = require('./routes/menuroutes');
const resturantRouter = require('./routes/resturantroutes')
const orderRouter = require('./routes/orderroutes');

const app = express();

mongoose.connect("mongodb://localhost:27017/food").then(() => {
    console.log('Database connected');
});


app.use(cors());
app.use(express.json());

app.use('/auth', router);
app.use('/admin', adminRouter,menuRouter,resturantRouter,orderRouter);




const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
