'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    static associate(models) {
      project.hasMany(models.bug, {
        foreignKey: 'projectId',
      });

      project.belongsToMany(models.user, {
        through: models.projectuser,
        foreignKey: 'projectId',
      });
    }
  }
  project.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'project',
    }
  );
  return project;
};
