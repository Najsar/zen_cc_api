'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_list = sequelize.define('product_list', {
    type: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    countable: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'product_list'
  });
  product_list.associate = function(models) {
    // associations can be defined here
    product_list.belongsTo(models.product_type, {
      foreignKey: 'type',
      targetKey: 'id'
    });
  };
  return product_list;
};