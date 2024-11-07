const express = require('express');
const { checkAuth } = require('../middleware/auth');
const { HandleAddData, HandleShowByPermissionRole } = require('../controller/data.controller');


const dataRouter = express.Router(); 




dataRouter.route('/data').post(checkAuth,HandleAddData)
dataRouter.route('/showData/:id').get(checkAuth,HandleShowByPermissionRole)
module.exports = dataRouter;
