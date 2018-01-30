const models = require('../models');

let djChecker = (TypeId, callback) => {
  models.Type.findById(TypeId)
    .then(type => {
      type.name == 'DJ' ? callback(true) : callback(false);
    })
    .catch(error => {
      console.log(error);
    })
}

module.exports = djChecker;
