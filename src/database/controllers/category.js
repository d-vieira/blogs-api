const categoryService = require('../services/category');

const findAll = async (_req, res) => {
  const { code, data, message } = await categoryService.findAll();
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
};

const create = async (req, res) => {
  const { name } = req.body;
  const { code, data, message } = await categoryService.create({ name });
  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
};

module.exports = {
  findAll,
  create,
};
