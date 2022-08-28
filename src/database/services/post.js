const { BlogPost, User, Category } = require('../models');

const findAll = async () => {
  const data = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
  });
  if (!data.length) return { code: 404, message: 'Not Found' };
  return { code: 200, data };
};

const findByPk = async (id) => {
  const data = await BlogPost.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
  });
  if (!data) return { code: 404, message: 'Post does not exist' };
  return { code: 200, data };
};

module.exports = {
  findAll,
  findByPk,
};
