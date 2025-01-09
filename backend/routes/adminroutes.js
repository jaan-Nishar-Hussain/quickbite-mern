const express = require('express');

const{adminLogin,adminRegister} = require ('../controller/admincontroller');

const adminRouter = express.Router();

adminRouter.post('/register',adminRegister);
adminRouter.post('/login',adminLogin);




module.exports=adminRouter