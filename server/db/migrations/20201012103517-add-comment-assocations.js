'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //comment belongs to bug
    return queryInterface
      .addColumn('comments', 'bugId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'bugs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

  down: async (queryInterface) => {
    //remove comment belongs to bug
    return queryInterface.removeColumn('comments', 'bugId').then(() => {
      //remove comment belongs to user
      return queryInterface.removeColumn('comments', 'userId');
    });
  },
};
