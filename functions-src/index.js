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

exports.auditEvents = functions.firestore.document('{document}/{id}').onCreate(async event => {
    try {
        const user = await admin.auth().getUser(event.auth.uid);
        await event.data.ref.update({createdAt: new Date(), createdBy: user.uid});
        
    } catch (error) {
        await event.data.ref.update({createdAt: new Date(), createdBy: event.auth.uid});
    }
});

exports.auth = functions.https.onRequest(require('./app'));


