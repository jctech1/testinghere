const admin = require('firebase-admin');

const serviceAccount = require('./jc-box-firebase-adminsdk-bo8gz-8ec270071e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function updateUserRole(uid, role) {
  admin.auth().setCustomUserClaims(uid, { role })
    .then(() => {
      console.log(`Custom claim "role" set to "${role}" for user with UID: ${uid}`);
    })
    .catch(error => {
      console.log('Error setting custom claim:', error);
    });
}

const uid = 'e3NZUlKtO9gBUjOj1aSL3SRFhnJ3'; // The UID of the user you want to update
const role = 'admin'; // The role you want to assign to this user

updateUserRole(uid, role);
