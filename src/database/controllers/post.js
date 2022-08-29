const postService = require('../services/post');
const jwtHelpers = require('../helpers/jwt');

const findAll = async (_req, res) => {
  const { code, data, message } = await postService.findAll();
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
};

const findByPk = async (req, res) => {
  const { code, data, message } = await postService.findByPk(req.params.id);
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
};

const create = async (req, res) => {
  const { authorization } = req.headers;
  const { title, content, categoryIds } = req.body;
  const { userId } = jwtHelpers.verifyToken(authorization);
  const { code, data, message } = await postService.create({
    userId,
    title,
    content,
    categoryIds,
  });
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
};

module.exports = {
  findAll,
  findByPk,
  create,
};
