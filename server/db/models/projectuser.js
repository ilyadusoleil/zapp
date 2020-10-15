'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projectuser extends Model {
    static associate(models) {
      projectuser.hasMany(models.user, {
        foreignKey: 'id', //TODO allownull false
      });

      projectuser.hasMany(models.project, {
        foreignKey: 'id', //TODO allownull false
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
