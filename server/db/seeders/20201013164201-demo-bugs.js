'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('bugs', [
      {
        title: 'high-priority demo-bug',
        description:
          'This is a high-priority bug on the test project that has been closed',
        state: 2,
        priority: 0,
        category: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        projectId: 1,
        userId: 2,
      },
      {
        title: 'medium-priority demo-bug',
        description:
          'This is a medium-priority bug on the test project that has been assigned and is still open',
        state: 1,
        priority: 1,
        category: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        projectId: 1,
        userId: 4,
      },
      {
        title: 'low-priority demo-bug',
        description:
          'This is a low-priority bug on the test project that has not yet been assigned',
        state: 0,
        priority: 2,
        category: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        projectId: 1,
        userId: 6,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('bugs', null, {});
  },
};
