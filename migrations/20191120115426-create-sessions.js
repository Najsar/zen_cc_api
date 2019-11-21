'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sort: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.STRING
      },
      main_price: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      paid_price: {
        type: Sequelize.STRING
      },
      exchange: {
        type: Sequelize.STRING
      },
      time: {
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
    return queryInterface.dropTable('sessions');
  }
};