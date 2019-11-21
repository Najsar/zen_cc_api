'use strict';
module.exports = (sequelize, DataTypes) => {
  const expense_type = sequelize.define('expense_type', {
    type: DataTypes.STRING
  }, {});
  expense_type.associate = function(models) {
    // associations can be defined here
  };
  return expense_type;
};