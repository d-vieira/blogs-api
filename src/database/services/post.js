const { BlogPost } = require('../models');

const findAll = async () => {
  const data = await BlogPost.findAll();
  if (!data) return { code: 404, message: 'Not Found' };
  return { code: 200, data };
};

module.exports = {
  findAll,
};
