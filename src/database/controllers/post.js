const postService = require('../services/post');

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

module.exports = {
  findAll,
  findByPk,
};
