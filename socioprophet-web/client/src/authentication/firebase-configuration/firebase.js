import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDeZueSUiuOAgQuDOBAF5QWvFce_fjkMMc",
  authDomain: "socioprophet-web.firebaseapp.com",
  databaseURL: "https://socioprophet-web.firebaseio.com",
  projectId: "socioprophet-web",
  storageBucket: "socioprophet-web.appspot.com",
  messagingSenderId: "392608809931",
  appId: "1:392608809931:web:2605ec0bc89fa9fa662c4e",
  measurementId: "G-3MMLTVVF2S",
});

export const auth = app.auth();
export default app;

/**
 *
 *  TODO: add in firebase analytics
 *
 */
app.analytics();
