'use strict';
const emailSender = require('../helpers/emailSender');

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

  Book.afterUpdate((book, options) => {
    sequelize.models.DJ.findById(book.DJId)
    .then(dj => {
      sequelize.models.User.findById(dj.UserId)
      .then(user => {
        console.log('KIRIM EMAIL DISINI');
        let obj = {
          email: user.email,
          subject: 'You have an email from findUrDije',
          message: 'Cihuy'
        }
        let emailMessage = emailSender(obj);
        console.log(emailMessage);
      })
      .catch(error => {
        throw error
      });
    })
    .catch(error => {
      throw error;
    });
  });

  return Book;
};
