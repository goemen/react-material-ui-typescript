
import * as firebase from 'firebase';
import { CONFIG } from './firebase-config';

export const firebaseApp = (): firebase.app.App => firebase.initializeApp(CONFIG.firebaseConfig);