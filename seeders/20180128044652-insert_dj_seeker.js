'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('DJSeekers', [{
      name: 'John Kabira',
      phone: '019091091',
      address: 'Jakarta Selatan',
      UserId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Muhaimin',
      phone: '019091092',
      address: 'Jakarta Selatan Banget',
      UserId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('DJSeekers', null, {});
  }
};
