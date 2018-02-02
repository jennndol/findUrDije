'use strict';
module.exports = (sequelize, DataTypes) => {
  var DJSeeker = sequelize.define('DJSeeker', {
    name: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Nomor telepon harus menggunakan angka'
        }
      }
    },
    address: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  });

  DJSeeker.associate = (models) => {
    DJSeeker.hasMany(models.Event);

    DJSeeker.belongsTo(models.User);
  }

  return DJSeeker;
};
