import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOVULDmte4CZ8PdwFCeuo_9EfNKxYsB0c",
  authDomain: "signal-alert-30dca.firebaseapp.com",
  projectId: "signal-alert-30dca",
  storageBucket: "signal-alert-30dca.appspot.com",
  messagingSenderId: "930817047479",
  appId: "1:930817047479:web:3c4dc0cd2ef8861b224632"
};

// RTDB
// {
//   "rules": {
//     ".read": "now < 1615503600000",  // 2021-3-12
//     ".write": "now < 1615503600000",  // 2021-3-12
//   }
// }

//initialization
// let app;
// if(firebase.apps.lenght === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app();
// }
// const firebaseApp = firebase.initializeApp(firebaseConfig);

const app = firebase;
firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };