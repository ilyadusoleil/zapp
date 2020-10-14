'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('comments', [
      {
        content: 'This is a comment left by Ste',
        createdAt: new Date(),
        updatedAt: new Date(),
        bugId: 1,
        userId: 1,
      },
      {
        content: 'This is a comment left by Rupert',
        createdAt: new Date(),
        updatedAt: new Date(),
        bugId: 2,
        userId: 2,
      },
      {
        content: 'This is a comment left by Hamish',
        createdAt: new Date(),
        updatedAt: new Date(),
        bugId: 3,
        userId: 3,
      },
      {
        content: 'This is a comment left by Chris',
        createdAt: new Date(),
        updatedAt: new Date(),
        bugId: 1,
        userId: 4,
      },
      {
        content: 'This is a comment left by Jill',
        createdAt: new Date(),
        updatedAt: new Date(),
        bugId: 2,
        userId: 5,
      },
      {
        content: 'This is a comment left by Stephen',
        createdAt: new Date(),
        updatedAt: new Date(),
        bugId: 3,
        userId: 6,
      },
      {
        content: 'This is a comment left by Connor',
        createdAt: new Date(),
        updatedAt: new Date(),
        bugId: 1,
        userId: 7,
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
