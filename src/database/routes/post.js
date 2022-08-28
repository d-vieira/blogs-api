const { Router } = require('express');
const postController = require('../controllers/post');
const auth = require('../middleware/auth');
const rescue = require('../middleware/rescue');

const postRouter = Router();

postRouter.get('/', auth, rescue(postController.findAll));

module.exports = postRouter;
