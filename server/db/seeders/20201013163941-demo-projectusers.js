'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('projectusers', [
      {
        authorization: 0,
        userId: 1,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 1,
        userId: 2,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 1,
        userId: 3,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 1,
        userId: 4,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 1,
        userId: 5,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 1,
        userId: 6,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorization: 1,
        userId: 7,
        projectId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('projectusers', null, {});
  },
};
