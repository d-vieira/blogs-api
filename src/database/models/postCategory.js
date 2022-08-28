const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    timestamps: false
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'postId',
      as: 'categories',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'categoryId',
      as: 'blogPost',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};

module.exports = PostCategory;
