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
  if (!data) return { code: 404, message: 'Not Found' };
  return { code: 200, data };
};

module.exports = {
  findAll,
};
