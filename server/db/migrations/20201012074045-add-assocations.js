'use strict';

const sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //ADD ASSOCIATIONS

    //user belongs to many projects through projectuser
    return queryInterface
      .addColumn('projectuser', 'userId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() => {
        //project has many users through projectuser
        return queryInterface.addColumn('projectuser', 'projectId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'project',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      })
      .then(() => {
        //bug belongs to project
        return queryInterface.addColumn('bug', 'projectId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'project',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL', // TODO
        });
      })
      .then(() => {
        //bug belongs to user
        return queryInterface.addColumn('bug', 'userId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL', // TODO
        });
      })
      .then(() => {
        //comment belongs to bug
        return queryInterface.addColumn('comment', 'bugId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'bug',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      })
      .then(() => {
        //comment belongs to user
        return queryInterface.addColumn('comment', 'userId', {
          type: Sequelize.INTEGER,
          references: {
            model: 'user',
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
      .removeColumn('projectuser', 'userId')
      .then(() => {
        //remove project has many users through projectuser
        return queryInterface.removeColumn('projectuser', 'projectId');
      })
      .then(() => {
        //remove bug belongs to project
        return queryInterface.removeColumn('bug', 'projectId');
      })
      .then(() => {
        //remove bug belongs to user
        return queryInterface.removeColumn('bug', 'userId');
      })
      .then(() => {
        //remove comment belongs to bug
        return queryInterface.removeColumn('comment', 'bugId');
      })
      .then(() => {
        //remove comment belongs to user
        return queryInterface.removeColumn('comment', 'userId');
      });
  },
};
