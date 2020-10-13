'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('projectusers', [
      {
        authorization: 'Owner',
        userId: 1,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 'Dev',
        userId: 2,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 'Dev',
        userId: 3,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 'Dev',
        userId: 4,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 'Dev',
        userId: 5,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 'Dev',
        userId: 6,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 'Dev',
        userId: 7,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projectusers', null, {});
  },
};
