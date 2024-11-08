const express = require('express');

const { HandleRegester, HandleLogin } = require('../controller/Memeber.controller');


const userrouter = express.Router(); 



userrouter.route('/regester').post(HandleRegester) //regester


userrouter.route('/Login').post(HandleLogin); //Login




module.exports = userrouter;
