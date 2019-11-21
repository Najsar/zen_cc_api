'use strict';
module.exports = (sequelize, DataTypes) => {
  const login_session = sequelize.define('login_session', {
    user_id: DataTypes.INTEGER,
    session: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  login_session.associate = function(models) {
    // associations can be defined here
  };
  return login_session;
};