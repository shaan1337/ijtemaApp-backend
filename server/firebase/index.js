var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

var config = {
};

firebaseAdmin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL
});

module.exports = firebaseAdmin;