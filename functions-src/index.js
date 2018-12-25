const functions = require('firebase-functions');
const admin = require('firebase-admin');
import { CONFIG } from './config';
import * as _ from 'lodash';
admin.initializeApp(functions.config().firebase);

exports.addAdminClaimToUser = functions.auth.user().onCreate(event => {
    
    if (_.includes(CONFIG.adminUsersEmails, event.email)) {
        return admin.auth().setCustomUserClaims(event.uid, {
            admin: true
        });
    } else {
        return;
    }
});

exports.addEventToUser = functions.firestore.document('events/{id}').onCreate(async (event, context)=> {
    try {
        const data = event.data();
        if (!data.createdBy) {
            return;
        }
        const userDoc = await admin.firestore().doc('users/' + data.createdBy).get();

        if (!userDoc.exists) {
            return;
        }

        const user = userDoc.data();

        const createdEvents = user.createdEvents || {};
        createdEvents[event.id] = true;
        return await admin.firestore().doc('users/' + userDoc.id).update({createdEvents});
        
    } catch (error) {
        return;
    }
});

exports.auth = functions.https.onRequest(require('./app'));
exports.events = functions.https.onRequest(require('./app/events'));


