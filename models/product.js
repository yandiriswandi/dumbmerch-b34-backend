'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      product.belongsTo(models.user, {
        as: 'user',
        foreignKey: {
          name: 'idUser',
        },
      });

      product.hasMany(models.transaction, {
        as: 'transactions',
        foreignKey: {
          name: 'idProduct',
        },
      });
      // relation for product to category with table categoryproduct as through
      product.belongsToMany(models.category, {
        as: 'categories',
        through: {
          model: 'categoryProduct',
          as: 'bridge',
        },
        foreignKey: 'idProduct',
      });

      product.belongsToMany(models.transaction, {
        as: 'transaction',
        through: {
          model: 'transactionProduct',
          as: 'bridge',
        },
        foreignKey: 'idProduct',
      });
    }
  }
  product.init({
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    price: DataTypes.BIGINT,
    image: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};