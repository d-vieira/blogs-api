const { Category } = require('../models');

const findAll = async () => {
  const data = await Category.findAll();
  if (!data.length) return { code: 404, message: 'Not Found' };
  return { code: 200, data };
};

const create = async ({ name }) => {
  const exist = await Category.findOne({ where: { name } });
  if (exist) return { code: 409, message: 'This category already exists!' };
  const data = await Category.create({ name });
  return { code: 201, data: { id: data.id, name: data.name } };
};

module.exports = {
  findAll,
  create,
};
