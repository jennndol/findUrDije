'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    TypeId: DataTypes.INTEGER
  });

  User.associate = (models) => {
    User.belongsTo(models.Type);

    User.hasOne(models.DJ);
    User.hasOne(models.DJSeeker);
  }

  return User;
};
