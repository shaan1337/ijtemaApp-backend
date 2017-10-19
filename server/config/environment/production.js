'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP
    || process.env.ip
    || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT
    || process.env.PORT
    || 8080,

  sequelize: {
    uri: 'mysql://root:@127.0.0.1:3306/ijtema',
    options: {
      logging: false,
      storage: 'mysql',
      define: {
      timestamps: false
      }
    }
  }
};
