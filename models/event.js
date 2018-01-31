'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Nama event tidak boleh kosong'
        }
      }
    },
    detail: DataTypes.TEXT,
    date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Tanggal tidak boleh kosong'
        }
      }
    },
    DJSeekerId: DataTypes.INTEGER
  });

  Event.associate = (models) => {
    Event.hasMany(models.Book);

    Event.belongsTo(models.DJSeeker);
    Event.belongsToMany(models.DJ, {
      through: {
        model: models.Book
      }
    });
  }

  return Event;
};
