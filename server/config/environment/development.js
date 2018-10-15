'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'mysql://root:@127.0.0.1:3306/ijtema',
    options: {
      logging: false,
      storage: 'mysql',
      define: {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci'
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
