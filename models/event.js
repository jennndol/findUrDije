'use strict';
const moment = require('moment');

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
        isAfter: {
          args: new Date().toISOString().slice(0,10),
          msg: "Tidak boleh melihat masa lalu"
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

  Event.prototype.dateHumanize = function () {
    moment.locale('id');
    let myDate = this.date.toISOString().slice(0,10).split('-').join("");
    return (moment(myDate, "YYYYMMDD").fromNow());
  };
  return Event;
};
