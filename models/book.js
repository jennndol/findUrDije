'use strict';
const emailSender = require('../helpers/emailSender');
const isAccepted = require('../helpers/isAccepted');

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
    sequelize.models.Event.findById(book.EventId, {
        include: [sequelize.models.DJSeeker]
      })
      .then(event => {
        sequelize.models.User.findById(event.DJSeeker.UserId)
          .then(user => {
            let obj = {
              email: user.email,
              subject: 'Konfirmasi Pertunjukan Anda',
              message: ` ${event.DJSeeker.name}, DJ yang anda pilih telah ${isAccepted(book.isApproved)} permintaan untuk mengisi acara anda`
            }
            let emailMessage = emailSender(obj);
            console.log(emailMessage);
          })
          .catch(error => {
            throw error
          })
      })
      .catch(error => {
        throw error
      });

    sequelize.models.DJ.findById(book.DJId, {
        include: [sequelize.models.User]
      })
      .then(dj => {
        let obj = {
          email: dj.User.email,
          subject: 'Konfirmasi Pertunjukan Anda',
          message: ` ${dj.name}, anda telah ${isAccepted(book.isApproved)} permintaan untuk mengisi acara`
        }
        let emailMessage = emailSender(obj);
        console.log(emailMessage);
      })
      .catch(error => {
        throw error;
      });
  });

  return Book;
};
