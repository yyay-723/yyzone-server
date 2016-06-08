'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    is_comment: DataTypes.INTEGER,
    is_private: DataTypes.INTEGER,
    publish_time: DataTypes.DATE,
    view_count: DataTypes.INTEGER,
    comment_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Blog.belongsTo(models.User,{foreignKey:'user_id'});
        Blog.belongsTo(models.BlogCategory,{foreignKey:'category_id'});
      }
    },
    'paranoid': true,
    'underscoredAll': true,
    'underscored': true
  });
  return Blog;
};