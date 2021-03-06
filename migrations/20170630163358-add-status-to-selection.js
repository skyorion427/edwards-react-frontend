'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     return queryInterface.addColumn(
      'Selections',
      'status',
       {
         defaultValue: 'pending',
        type: Sequelize.STRING
      }
    );
 },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Selections',
      'status'
    );
  }
};
