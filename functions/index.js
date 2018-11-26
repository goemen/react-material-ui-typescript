const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createProfile = functions.auth.user().onOperation (event => {
    const data = {
        email: event.email,
        displayName: event.displayName,
        photoUrl: event.photoURL,
        uid: event.uid
    };

    return admin.firestore().collection(`users`).doc(data.uid).create(data);
});


