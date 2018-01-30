'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [{
      username: 'abc',
      email: 'abc@gmail.com',
      password: 'abce',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'def',
      email: 'def@gmail.com',
      password: 'abce',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'ghi',
      email: 'ghi@gmail.com',
      password: 'abce',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'jkl',
      email: 'jkl@gmail.com',
      password: 'abce',
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
    return queryInterface.bulkDelete('Users', null, {});
  }
};
