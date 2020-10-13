'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      comment.belongsTo(models.bug, {
        foreignKey: {
          allowNull: false,
        },
      });
      comment.belongsTo(models.user, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  comment.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'comment',
    }
  );
  return comment;
};
