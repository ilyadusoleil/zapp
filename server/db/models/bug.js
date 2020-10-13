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
        type: DataTypes.INTEGER,
        defaultValue: 0, // TODO sort out values system for state of bug - Open, Assigned, Closed?
        allowNull: false,
      },
      priority: {
        type: DataTypes.INTEGER, // can have values 0 - 2. '0' highest priority and '2' lowest priority
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
