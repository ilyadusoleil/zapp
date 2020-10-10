'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bug.belongsTo(models.project, {
        foreignKey: {
          allowNull: false,
        },
      });
      bug.belongsTo(models.user, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  bug.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      state: DataTypes.STRING,
      priority: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'bug',
    }
  );
  return bug;
};
