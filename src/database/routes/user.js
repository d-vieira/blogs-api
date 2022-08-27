const { Router } = require('express');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const rescue = require('../middleware/rescue');
const validate = require('../middleware/validations');

const userRouter = Router();

userRouter.post('/', validate.register, rescue(userController.register));
userRouter.get('/', auth, rescue(userController.findAll));

module.exports = userRouter;
