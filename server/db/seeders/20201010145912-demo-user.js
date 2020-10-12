'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'SteHR@email.com',
        firstName: 'Ste',
        lastName: 'Head-Rapson',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'RubertBright@email.com',
        firstName: 'Rupert',
        lastName: 'Bright',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'HamishChan@email.com',
        firstName: 'Hamish',
        lastName: 'Chan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'ChrisPerry@email.com',
        firstName: 'Chris',
        lastName: 'Perry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'JillMasters@email.com',
        firstName: 'Jill',
        lastName: 'Masters',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'StephenMatthews@email.com',
        firstName: 'Stephen',
        lastName: 'Matthews',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'ConnorMacPhee@email.com',
        firstName: 'Connor',
        lastName: 'MacPhee',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
