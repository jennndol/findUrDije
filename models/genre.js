'use strict';
module.exports = (sequelize, DataTypes) => {
  var Genre = sequelize.define('Genre', {
    name: DataTypes.STRING
  });

  Genre.associate = (models) => {
    Genre.hasMany(models.DJGenre);

    Genre.belongsToMany(models.DJ, {
      through: {
        model: models.DJGenre
      }
    });
  }


  return Genre;
};
