'use strict';
module.exports = (sequelize, DataTypes) => {
  var Type = sequelize.define('Type', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Nama tipe tidak boleh kosong'
        }
      }
    }
  });

  Type.associate = (models) => {
    Type.hasMany(models.User);
  }

  return Type;
};
