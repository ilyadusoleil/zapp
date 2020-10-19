'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'stehr@email.com',
        firstName: 'Ste',
        lastName: 'Head-Rapson',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'rupertbright@email.com',
        firstName: 'Rupert',
        lastName: 'Bright',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'hamishchan@email.com',
        firstName: 'Hamish',
        lastName: 'Chan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'chrisperry@email.com',
        firstName: 'Chris',
        lastName: 'Perry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jillmasters@email.com',
        firstName: 'Jill',
        lastName: 'Masters',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'stephenmatthews@email.com',
        firstName: 'Stephen',
        lastName: 'Matthews',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'connormacphee@email.com',
        firstName: 'Connor',
        lastName: 'MacPhee',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
