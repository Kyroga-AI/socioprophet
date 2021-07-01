import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {
  FIREBASE_DATABASE_URL,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '../../../variables/environment';

let firebaseCredentials;
if (process.env.NODE_ENV === 'development') {
  firebaseCredentials = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
  };
}
if (process.env.NODE_ENV === 'production') {
  firebaseCredentials = {
    databaseURL: 'https://socioprophet-web.firebaseio.com',
    apiKey: 'AIzaSyDeZueSUiuOAgQuDOBAF5QWvFce_fjkMMc',
    authDomain: 'auth.socioprophet.com',
    projectId: 'socioprophet-web',
    storageBucket: 'socioprophet-web.appspot.com',
    messagingSenderId: '392608809931',
    appId: '1:392608809931:web:2605ec0bc89fa9fa662c4e',
    measurementId: 'G-3MMLTVVF2S',
  };
}

const app = firebase.initializeApp(firebaseCredentials);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/admin.directory.group');
googleProvider.addScope('https://www.googleapis.com/auth/admin.directory.group.member');
export const emailProvider = new firebase.auth.EmailAuthProvider();
export const auth = app.auth();
export const db = app.firestore();
export default app;
