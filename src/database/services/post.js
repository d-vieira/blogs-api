const { BlogPost, User, Category, sequelize, PostCategory } = require('../models');

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

const create = async ({ userId, title, content, categoryIds }) => {
  const exist = await Category.findOne({ where: { id: categoryIds } });
  if (!exist) return { code: 400, message: '"categoryIds" not found' };
  const data = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create({
      title, content, userId,
      }, { transaction: t });
    const categories = categoryIds.map((category) => ({
      postId: post.dataValues.id, categoryId: category,
    }));
    await PostCategory.bulkCreate(categories, { transaction: t });
    return post;
  });
  return { code: 201, data };
};

module.exports = {
  findAll,
  findByPk,
  create,
};
