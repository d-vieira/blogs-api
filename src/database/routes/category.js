const { Router } = require('express');
const categoryController = require('../controllers/category');
const auth = require('../middleware/auth');
const rescue = require('../middleware/rescue');

const categoryRouter = Router();

categoryRouter.get('/', auth, rescue(categoryController.findAll));

module.exports = categoryRouter;
