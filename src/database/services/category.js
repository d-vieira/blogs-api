const { Category } = require('../models');

const findAll = async () => {
  const data = await Category.findAll();
  if (!data.length) return { code: 404, message: 'Not Found' };
  return { code: 200, data };
};

module.exports = {
  findAll,
};
