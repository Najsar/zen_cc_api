'use strict';
module.exports = (sequelize, DataTypes) => {
  const sessions = sequelize.define('sessions', {
    sort: DataTypes.STRING,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    payment: DataTypes.STRING,
    main_price: DataTypes.STRING,
    price: DataTypes.STRING,
    paid_price: DataTypes.STRING,
    exchange: DataTypes.STRING,
    time: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'sessions'
  });
  sessions.associate = function(models) {
    // associations can be defined here
  };
  return sessions;
};