'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
    .addColumn('users', 'recentProject', {
      type: Sequelize.INTEGER
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('users', 'recentProject')
  }
};
