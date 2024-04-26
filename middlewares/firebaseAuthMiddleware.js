const admin = require('firebase-admin');
const serviceAccount = require('./jc-box-firebase-adminsdk-bo8gz-8ec270071e.json');
// Initialize the Firebase admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const firebaseAuthMiddleware = async (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
        return res.status(401).send('No token provided');
    }

    if (headerToken && headerToken.startsWith('Bearer ')) {
        const idToken = headerToken.split('Bearer ')[1];
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            req.user = decodedToken;
            next();
        } catch (error) {
            console.error('Error verifying token =>', error);
            res.status(403).send('Unauthorized');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = firebaseAuthMiddleware;
