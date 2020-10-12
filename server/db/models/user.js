'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsToMany(models.project, {
        through: models.projectuser,
        foreignKey: 'userId',
      });
      user.hasMany(models.bug, {
        foreignKey: 'userId',
      });
      user.hasMany(models.comment, {
        foreignKey: 'commentId',
      });
    }
  }
  user.init(
    {
      googleId: DataTypes.STRING,
      displayName: DataTypes.STRING,
      image: DataTypes.STRING,
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
