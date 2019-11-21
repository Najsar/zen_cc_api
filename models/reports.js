'use strict';
module.exports = (sequelize, DataTypes) => {
  const reports = sequelize.define('reports', {
    start_cash: DataTypes.STRING,
    cash: DataTypes.STRING,
    card: DataTypes.STRING,
    expense: DataTypes.STRING,
    pcstore: DataTypes.STRING,
    grupon: DataTypes.STRING,
    s_prezenty: DataTypes.STRING,
    profit: DataTypes.STRING,
    partners: DataTypes.STRING,
    exchange: DataTypes.STRING,
    bonus: DataTypes.STRING,
    end_balance: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  reports.associate = function(models) {
    // associations can be defined here
  };
  return reports;
};