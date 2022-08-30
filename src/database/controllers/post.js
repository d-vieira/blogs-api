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

const update = async (req, res) => {
  const { authorization } = req.headers;
  const { title, content } = req.body;
  const { id } = jwtHelpers.verifyToken(authorization);
  const { code, data, message } = await postService.update(req.params.id, { title, content, id });
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
};

const destroy = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = jwtHelpers.verifyToken(authorization);
  const { code, message } = await postService.destroy(req.params.id, id);
  if (message) return res.status(code).json({ message });
  return res.status(code).end();
};

module.exports = {
  findAll,
  findByPk,
  create,
  update,
  destroy,
};
