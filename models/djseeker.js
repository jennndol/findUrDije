'use strict';
module.exports = (sequelize, DataTypes) => {
  var DJSeeker = sequelize.define('DJSeeker', {
    name: {
      type: DataTypes.STRING,
      validate: {
        isEmpty: {
          args: true,
          msg: 'Nama tidak boleh kosong'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Nama harus menggunakan alphanumeric'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isEmpty: {
          args: true,
          msg: 'Nama tidak boleh kosong'
        },
        isNumeric: {
          args: true,
          msg: 'Nomor telepon harus menggunakan angka'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        isEmpty: {
          args: true,
          msg: 'Alamat tidak boleh kosong'
        }
      }
    },
    UserId: DataTypes.INTEGER
  });

  DJSeeker.associate = (models) => {
    DJSeeker.hasMany(models.Event);

    DJSeeker.belongsTo(models.User);
  }

  return DJSeeker;
};
