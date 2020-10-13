'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bug extends Model {
    static associate(models) {
      bug.belongsTo(models.project, {
        foreignKey: {
          allowNull: false,
        },
      });
      bug.belongsTo(models.user, {
        foreignKey: {
          allowNull: true,
        },
      });
      bug.hasMany(models.comment, {
        foreignKey: 'id',
      });
    }
  }
  bug.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: DataTypes.INTEGER, //can have values 1 - 3. '1' highest priority and '3' lowest priority
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'bug',
    }
  );
  return bug;
};
