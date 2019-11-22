'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    Name: DataTypes.STRING,
    Pass: DataTypes.STRING,
    Salt: DataTypes.STRING,
    isAdmin: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'users'
  });
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};