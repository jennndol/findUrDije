'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    EventId: DataTypes.INTEGER,
    DJId: DataTypes.INTEGER,
    isApproved: DataTypes.BOOLEAN
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Event);
    Book.belongsTo(models.DJ);
  }

  return Book;
};
