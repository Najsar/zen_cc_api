'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_type = sequelize.define('product_type', {
    type: DataTypes.STRING,
    cash: DataTypes.INTEGER,
    use_in_bonus: DataTypes.INTEGER,
    fixed_price: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'product_type'
  });
  product_type.associate = function(models) {
    // associations can be defined here
  };
  return product_type;
};