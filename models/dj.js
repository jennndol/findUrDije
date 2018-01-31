'use strict';
module.exports = (sequelize, DataTypes) => {
  var DJ = sequelize.define('DJ', {
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
    detail: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  });

  DJ.associate = (models) => {
    DJ.hasMany(models.Book);
    DJ.hasMany(models.DJGenre);

    DJ.belongsTo(models.User);
    DJ.belongsToMany(models.Genre, {
      through: {
        model: models.DJGenre
      }
    });
    DJ.belongsToMany(models.Event, {
      through: {
        model: models.Book
      }
    });
  }

  return DJ;
};
