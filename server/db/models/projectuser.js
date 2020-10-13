'use strict';
const { Model } = require('sequelize');
const project = require('./project');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class projectuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

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
