const functions = require('firebase-functions');
const admin = require('firebase-admin');
import { CONFIG } from '../.config';
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

exports.auth = functions.https.onRequest(require('./app'));


