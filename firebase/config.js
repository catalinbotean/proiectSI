import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR5gZisnSKmWROge4onVHA-ea-wA6LpGg",
  authDomain: "wifi-f0745.firebaseapp.com",
  databaseURL: "https://wifi-f0745-default-rtdb.firebaseio.com/",
  projectId: "wifi-f0745",
  storageBucket: "wifi-f0745.appspot.com",
  messagingSenderId: "558935558401",
  appId: "1:558935558401:ios:6aa1b231e1b3af37513300",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
