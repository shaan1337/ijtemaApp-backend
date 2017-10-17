/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.FirebaseRegistration = db.sequelize.import('../api/firebase-registration/firebase-registration.model');
db.Competition = db.sequelize.import('../api/competition/competition.model');
db.Personaldetails = db.sequelize.import('../api/personaldetails/personaldetails.model');
db.Registration = db.sequelize.import('../api/registration/registration.model');
db.News = db.sequelize.import('../api/news/news.model');
db.Leaderboard = db.sequelize.import('../api/leaderboard/leaderboard.model');
db.User = db.sequelize.import('../api/user/user.model');

db.Registration.belongsTo(db.Personaldetails);
db.Registration.belongsTo(db.Competition);
module.exports = db;
