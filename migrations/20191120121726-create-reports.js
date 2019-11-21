'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_cash: {
        type: Sequelize.STRING
      },
      cash: {
        type: Sequelize.STRING
      },
      card: {
        type: Sequelize.STRING
      },
      expense: {
        type: Sequelize.STRING
      },
      pcstore: {
        type: Sequelize.STRING
      },
      grupon: {
        type: Sequelize.STRING
      },
      s_prezenty: {
        type: Sequelize.STRING
      },
      profit: {
        type: Sequelize.STRING
      },
      partners: {
        type: Sequelize.STRING
      },
      exchange: {
        type: Sequelize.STRING
      },
      bonus: {
        type: Sequelize.STRING
      },
      end_balance: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reports');
  }
};