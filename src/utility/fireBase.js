import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvhxT7wnsWUNQ4kyHwzSEwZo7IJPHOka8",
  authDomain: "clone-af030.firebaseapp.com",
  projectId: "clone-af030",
  storageBucket: "clone-af030.appspot.com",
  messagingSenderId: "2546753504",
  appId: "1:2546753504:web:7bbcf25929bbe5cdbc9585",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
