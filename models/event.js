'use strict';
module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    detail: DataTypes.TEXT,
    date: DataTypes.DATE,
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
