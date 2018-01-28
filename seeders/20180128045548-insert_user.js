'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      username: 'abc',
      email: 'abc@gmail.com',
      password: 'abce',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      username: 'def',
      email: 'def@gmail.com',
      password: 'abce',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      username: 'ghi',
      email: 'ghi@gmail.com',
      password: 'abce',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
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
