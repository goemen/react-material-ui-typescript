
import * as firebase from 'firebase/app';
import 'firebase/app';
import { CONFIG } from './firebase-config';

export const firebaseApp = (): firebase.app.App => { 
    const app = firebase.initializeApp(CONFIG.firebaseConfig); 
    app.firestore().settings({timestampsInSnapshots: true});
    return app;
}