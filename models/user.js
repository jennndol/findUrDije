'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username tidak boleh kosong'
        },
        isUnique(value, next) {
          User.findOne({
              where: {
                username: value,
                id: {
                  [sequelize.Op.ne]: this.id
                }
              }
            })
            .then(user => {
              if (user) {
                next('Username tidak tersedia')
              }
              next();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Pastikan format email benar'
        },
        notEmpty: {
          args: true,
          msg: 'Email tidak boleh kosong'
        },
        isUnique(value, next) {
          User.findOne({
              where: {
                email: value,
                id: {
                  [sequelize.Op.ne]: this.id
                }
              }
            })
            .then(user => {
              if (user) {
                next('Email sudah terdaftar');
              }
              next();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 6,
          msg: "Panjang minimal password adalah 6 karakter"
        },
        notEmpty: {
          args: true,
          msg: 'Password tidak boleh kosong'
        },
      }
    },
    TypeId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Tipe user harus dipilih'
        }
      }
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.Type);

    User.hasOne(models.DJ);
    User.hasOne(models.DJSeeker);
  }

  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
      .then(hash => {
        user.password = hash
      })
      .catch(error => {
        res.send(error);
      });
  });

  User.beforeCreate((user, options) => {
    user.username = user.username.toLowerCase();
    user.email = user.email.toLowerCase();
  });

  User.afterCreate((user, options) => {
    let obj = {
      name: user.username,
      UserId: user.id
    };

    sequelize.models.Type.findById(user.TypeId)
      .then(type => {
        if (type.name == 'DJ') {
          sequelize.models.DJ.create(obj)
            .then(dj => {
              console.log(dj);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          sequelize.models.DJSeeker.create(obj)
            .then(dJSeeker => {
              console.log(dJSeeker);
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  });

  User.prototype.login = function(password, callback) {
    bcrypt.compare(password, this.password)
      .then(isLogedin => {
        callback(isLogedin);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return User;
};
