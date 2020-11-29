import firebase from "firebase/app";
import "firebase/auth";

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
// firebase.analytics();

// const firebaseConfig = {
//   apiKey: "AIzaSyCfcazhFEQJNIkwG30Y4NS5JKnyH1TwrPM",
//   authDomain: "login-2ca80.firebaseapp.com",
//   databaseURL: "https://login-2ca80.firebaseio.com",
//   projectId: "login-2ca80",
//   storageBucket: "login-2ca80.appspot.com",
//   messagingSenderId: "1044519019950",
//   appId: "1:1044519019950:web:5d6fa2dea297af857f943f",
// };

// const fbase = firebase.initializeApp(firebaseConfig);

// export default fbase;
