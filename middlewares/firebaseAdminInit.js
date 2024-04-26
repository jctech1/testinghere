const admin = require('firebase-admin');
const serviceAccount = require('./jc-box-firebase-adminsdk-bo8gz-8ec270071e.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

module.exports = admin; // Only if you need to use the initialized 'admin' instance elsewhere
