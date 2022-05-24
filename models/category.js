'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relation between category to product through relational table category product
      category.belongsToMany(models.product, {
        as: 'products',
        through: {
          model: 'categoryProduct',
          as: 'bridge',
        },
        foreignKey: 'idCategory',
      });
    }
  }
  category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};