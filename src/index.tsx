import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './firebase-config';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement);
registerServiceWorker();
