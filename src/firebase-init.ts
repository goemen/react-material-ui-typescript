
import * as firebase from 'firebase/app';
import 'firebase/app';
import { CONFIG } from './firebase-config';

export const firebaseApp = (): firebase.app.App => firebase.initializeApp(CONFIG.firebaseConfig);