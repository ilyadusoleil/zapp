'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projectuser extends Model {
    static associate(models) {
      projectuser.hasMany(models.user, {
        foreignKey: 'id',
        allowNull: false,
      });

      projectuser.hasMany(models.project, {
        foreignKey: 'id',
        allowNull: false,
      });
    }
  }
  projectuser.init(
    {
      authorization: {
        type: DataTypes.INTEGER,
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
