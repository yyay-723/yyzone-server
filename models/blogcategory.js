'use strict';
module.exports = function(sequelize, DataTypes) {
  var BlogCategory = sequelize.define('BlogCategory', {
    name: DataTypes.STRING,
    blog_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    'paranoid': true,
    'underscoredAll': true,
    'underscored': true
  });
  return BlogCategory;
};