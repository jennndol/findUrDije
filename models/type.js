'use strict';
module.exports = (sequelize, DataTypes) => {
  var Type = sequelize.define('Type', {
    name: DataTypes.STRING
  });

  Type.associate = (models) => {
    Type.hasMany(models.User);
  }

  return Type;
};
