const { Router } = require('express');
const userController = require('../controllers/user');
const rescue = require('../middleware/rescue');
const validate = require('../middleware/validations');

const userRouter = Router();

userRouter.post('/', validate.register, rescue(userController.register));

module.exports = userRouter;
