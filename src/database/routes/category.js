const { Router } = require('express');
const categoryController = require('../controllers/category');
const auth = require('../middleware/auth');
const rescue = require('../middleware/rescue');
const validate = require('../middleware/validations');

const categoryRouter = Router();

categoryRouter.get('/', auth, rescue(categoryController.findAll));
categoryRouter.post('/', auth, validate.category, rescue(categoryController.create));

module.exports = categoryRouter;
