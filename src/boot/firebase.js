import { boot } from "quasar/wrappers"; // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL_sGr_1x5KEGcQsUke9pb9giHO79Pr_4",
  authDomain: "arcanum-fa5f2.firebaseapp.com",
  projectId: "arcanum-fa5f2",
  storageBucket: "arcanum-fa5f2.appspot.com",
  messagingSenderId: "56663155413",
  appId: "1:56663155413:web:54d4c2bb43587ef55cf85c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { db, auth };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
