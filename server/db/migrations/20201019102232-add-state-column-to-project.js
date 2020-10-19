'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('projects', 'state', {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('projects', 'state');
  },
};
