const express = require('express');

const router = express.Router();
const {login,register,getMenu,getResturants}= require('../controller/usercontroller');

router.post('/register',register);
router.post('/login',login);
router.get('/getmenu',getMenu);
router.get('/getresturant',getResturants);

module.exports=router;