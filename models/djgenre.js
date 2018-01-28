'use strict';
module.exports = (sequelize, DataTypes) => {
  var DJGenre = sequelize.define('DJGenre', {
    DJId: DataTypes.INTEGER,
    GenreId: DataTypes.INTEGER
  });

  DJGenre.associate = (models) => {
    DJGenre.belongsTo(models.DJ);
    DJGenre.belongsTo(models.Genre);
  }

  return DJGenre;
};
