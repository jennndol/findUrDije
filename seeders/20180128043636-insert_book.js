'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Books', [{
      id: 1,
      EventId: 1,
      DJId: 1,
      isApproved: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      EventId: 1,
      DJId: 2,
      isApproved: false,
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
    return queryInterface.bulkDelete('Books', null, {});
  }
};
