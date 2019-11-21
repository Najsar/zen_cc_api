'use strict';
module.exports = (sequelize, DataTypes) => {
  const login_session = sequelize.define('login_session', {
    user_id: DataTypes.INTEGER,
    session: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'login_session'
  });
  login_session.associate = function(models) {
    // associations can be defined here
  };
  return login_session;
};