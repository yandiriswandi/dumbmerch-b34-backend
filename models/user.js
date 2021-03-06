'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //relation for table user to table profile as parent
      user.hasOne(models.profile, {
        as: 'profile',
        foreignKey: {
          name: 'idUser',
        },
      });
      //relation for table user to product as parent
      user.hasMany(models.product, {
        as: 'products',
        foreignKey: {
          name: 'idUser',
        },
      });
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};