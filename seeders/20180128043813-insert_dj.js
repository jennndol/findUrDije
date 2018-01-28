'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('DJs', [{
      id: 1,
      name: 'John Doe',
      phone: '1234567890',
      address: 'Jakarta Barat',
      detail: 'DJ Yeah',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: 'Tiesto',
      phone: '1234567890',
      address: 'Jakarta Barat',
      detail: 'DJ Yeah',
      UserId: 2,
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
    return queryInterface.bulkDelete('DJs', null, {});
  }
};
