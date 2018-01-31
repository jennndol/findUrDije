'use strict';
module.exports = (sequelize, DataTypes) => {
  var Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Genre tidak boleh kosong'
        },
        isAlpha: {
          args: true,
          msg: 'Genre tidak boleh angka'
        }
      }
    }
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
