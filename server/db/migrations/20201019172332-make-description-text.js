'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('projects', 'description', {
      type: Sequelize.TEXT,
    });
    queryInterface.changeColumn('bugs', 'description', {
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('projects', 'description', {
      type: Sequelize.STRING,
    });
    queryInterface.changeColumn('bugs', 'description', {
      type: Sequelize.STRING,
    });
  },
};
