// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX7FKCBxLkqIthBp-nBTGVUS5N2knIbbU",
  authDomain: "turfujnform.firebaseapp.com",
  projectId: "turfujnform",
  storageBucket: "turfujnform.firebasestorage.app",
  messagingSenderId: "108760100107",
  appId: "1:108760100107:web:e44f28e4a52208d09e060e",
  measurementId: "G-1CRFSWTPER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };