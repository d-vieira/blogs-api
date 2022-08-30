const { Router } = require('express');
const postController = require('../controllers/post');
const auth = require('../middleware/auth');
const rescue = require('../middleware/rescue');
const validate = require('../middleware/validations');

const postRouter = Router();

postRouter.post('/', auth, validate.post, rescue(postController.create));
postRouter.get('/', auth, rescue(postController.findAll));
postRouter.get('/search', auth, rescue(postController.search));
postRouter.put('/:id', auth, validate.updatePost, rescue(postController.update));
postRouter.get('/:id', auth, rescue(postController.findByPk));
postRouter.delete('/:id', auth, rescue(postController.destroy));

module.exports = postRouter;
