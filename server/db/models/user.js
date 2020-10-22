'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsToMany(models.project, {
        through: models.projectuser,
        foreignKey: 'userId',
      });
      user.hasMany(models.bug, {
        foreignKey: 'userId', //TODO: verify userId is correct column
      });
      user.hasMany(models.comment, {
        foreignKey: 'id',
      });
    }
  }
  user.init(
    {
      email: {
        type: DataTypes.STRING, //only required field. Allows invitations to projects and users can complete sign up later
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recentProject: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
