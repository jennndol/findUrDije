'use strict';
module.exports = (sequelize, DataTypes) => {
  var DJ = sequelize.define('DJ', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    detail: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  });

  DJ.associate = (models) => {
    DJ.hasMany(models.Book);
    DJ.hasMany(models.DJGenre);

    DJ.belongsTo(models.User);
    DJ.belongsToMany(models.Genre, {
      through: {
        model: models.DJGenre
      }
    });
    DJ.belongsToMany(models.Event, {
      through: {
        model: models.Book
      }
    });
  }

  return DJ;
};
