'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment_method = sequelize.define('payment_method', {
    type: DataTypes.STRING,
    use_in_report: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'payment_method'
  });
  payment_method.associate = function(models) {
    // associations can be defined here
  };
  return payment_method;
};