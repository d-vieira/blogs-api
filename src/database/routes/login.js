const { Router } = require('express');

const userController = require('../controllers/user');
const rescue = require('../middleware/rescue');
const validate = require('../middleware/validations');

const loginRouter = Router();

loginRouter.post('/', validate.login, rescue(userController.login));

module.exports = loginRouter;
