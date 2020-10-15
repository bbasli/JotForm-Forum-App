import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "jotform-forum.firebaseapp.com",
  databaseURL: "https://jotform-forum.firebaseio.com",
  projectId: "jotform-forum",
  storageBucket: "jotform-forum.appspot.com",
  messagingSenderId: "419205639029",
  appId: process.env.REACT_APP_FIREBASE_APP_KEY,
  measurementId: "G-YX2KM4VX8J",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
