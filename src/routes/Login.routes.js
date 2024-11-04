const express = require('express');

const { HandleRegester, HandleLogin } = require('../controller/Memeber.controller');


const userrouter = express.Router(); 



userrouter.route('/regester').post(HandleRegester)


userrouter.route('/Login').post(HandleLogin);




module.exports = userrouter;
