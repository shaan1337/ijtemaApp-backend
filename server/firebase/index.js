var firebaseAdmin = require("firebase-admin");
var config = require("./config.js");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.credentialConfig),
  databaseURL: config.databaseUrl
});

module.exports = firebaseAdmin;