const { Op } = require('sequelize');
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

const create = async ({ id, title, content, categoryIds }) => {
  const exist = await Category.findOne({ where: { id: categoryIds } });
  if (!exist) return { code: 400, message: '"categoryIds" not found' };
  const data = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create({
      title, content, userId: id,
      }, { transaction: t });
    const categories = categoryIds.map((category) => ({
      postId: post.dataValues.id, categoryId: category,
    }));
    await PostCategory.bulkCreate(categories, { transaction: t });
    return post;
  });
  return { code: 201, data };
};

const update = async (post, { title, content, id }) => {
  const valid = await BlogPost.findOne({
    where: { [Op.and]: [{ id: post }, { userId: id }] },
  });
  if (!valid) return { code: 401, message: 'Unauthorized user' };
  await BlogPost.update({ title, content }, {
    where: { id: post },
  });
  const { data: { dataValues } } = await findByPk(post);
  return { code: 200, data: dataValues };
};

const destroy = async (postId, authId) => {
  const validPost = await findByPk(postId);
  if (validPost.message) return { code: 404, message: 'Post does not exist' };
  console.log('>>>>>>>>>>>>>:', authId, validPost.data.dataValues.userId);
  if (validPost.data.dataValues.userId !== authId) {
    return { code: 401, message: 'Unauthorized user' };
  }
  await BlogPost.destroy({ where: { id: postId } });
  return { code: 204 };
};

const search = async (q) => {
  const data = await BlogPost.findAll({
    where: { [Op.or]: [
        { title: { [Op.like]: `%${q}` } },
        { content: { [Op.like]: `%${q}` } }] },
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
    ] });
  return { code: 200, data };
};

module.exports = {
  findAll,
  findByPk,
  create,
  update,
  destroy,
  search,
};
