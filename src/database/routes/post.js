const { Router } = require('express');
const postController = require('../controllers/post');
const auth = require('../middleware/auth');
const rescue = require('../middleware/rescue');
const validate = require('../middleware/validations');

const postRouter = Router();

postRouter.post('/', auth, validate.post, rescue(postController.create));
postRouter.get('/', auth, rescue(postController.findAll));
postRouter.get('/:id', auth, rescue(postController.findByPk));

module.exports = postRouter;
