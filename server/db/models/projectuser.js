'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projectuser extends Model {
    static associate(models) {
      projectuser.hasMany(models.user, {
        foreignKey: 'id',
      });

      projectuser.hasMany(models.project, {
        foreignKey: 'id',
      });
    }
  }
  projectuser.init(
    {
      authorization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'projectuser',
    }
  );
  return projectuser;
};
