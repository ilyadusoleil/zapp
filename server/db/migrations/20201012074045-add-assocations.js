'use strict';

const sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //ADD ASSOCIATIONS

    //user belongs to many projects through projectuser
    return queryInterface
      .addColumn('projectusers', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() => {
        //project has many users through projectuser
        return queryInterface.addColumn('projectusers', 'projectId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'projects',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      })
      .then(() => {
        //bug belongs to project
        return queryInterface.addColumn('bugs', 'projectId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'projects',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      })
      .then(() => {
        //bug belongs to user
        return queryInterface.addColumn('bugs', 'userId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      })
      .then(() => {
        //comment belongs to bug
        return queryInterface.addColumn('comments', 'bugId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'bugs',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      })
      .then(() => {
        //comment belongs to user
        return queryInterface.addColumn('comments', 'userId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      });
  },

  down: async (queryInterface, Sequelize) => {
    //REMOVE ASSOCIATIONS

    //remove user belongs to many projects through projectuser
    return queryInterface
      .removeColumn('projectusers', 'userId')
      .then(() => {
        //remove project has many users through projectuser
        return queryInterface.removeColumn('projectusers', 'projectId');
      })
      .then(() => {
        //remove bug belongs to project
        return queryInterface.removeColumn('bugs', 'projectId');
      })
      .then(() => {
        //remove bug belongs to user
        return queryInterface.removeColumn('bugs', 'userId');
      })
      .then(() => {
        //remove comment belongs to bug
        return queryInterface.removeColumn('comments', 'bugId');
      })
      .then(() => {
        //remove comment belongs to user
        return queryInterface.removeColumn('comments', 'userId');
      });
  },
};
