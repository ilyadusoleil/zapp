'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('bugs', [
      {
        title: 'demo-bug',
        description: 'demo-bug to test database associations',
        state: 'assigned',
        priority: 'high',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
