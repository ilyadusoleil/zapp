'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('projects', [
      {
        name: 'Test project',
        description: 'Project generated from running seed command!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
