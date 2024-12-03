const admin = require('firebase-admin');

var serviceAccount = require('./file.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIRESTORE_DATABASE_URL
});

const db = admin.firestore();
const messaging = admin.messaging();

module.exports = db;
module.exports.messaging = messaging;