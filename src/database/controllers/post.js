const postService = require('../services/post');

const findAll = async (_req, res) => {
  const { code, data, message } = await postService.findAll();
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
};

module.exports = {
  findAll,
};
