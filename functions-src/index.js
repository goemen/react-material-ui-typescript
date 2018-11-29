const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createProfile = functions.auth.user().onCreate(event => {
    const data = {
        displayName: event.displayName,
        email: event.email,
        photoUrl: event.photoURL,
        uid: event.uid
    };
    
    if (user.email === 'gnthomiwa@gmail.com') {
        return admin.auth().setCustomUserClaims(event.uid, {
            admin: true
        });
    } else {
        return;
    }
});

exports.auth = functions.https.onRequest(require('./app'));


