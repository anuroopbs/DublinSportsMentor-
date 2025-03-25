// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfOCjSQXA1hZvbxUk_bhZzDFkLxnkInLQ",
  authDomain: "dublin-sports-hub.firebaseapp.com",
  projectId: "dublin-sports-hub",
  storageBucket: "dublin-sports-hub.firebasestorage.app",
  messagingSenderId: "39820720000",
  appId: "1:39820720000:web:fb89bee759d9fdcf96f365",
  measurementId: "G-BXGT20LRNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig) ;
const db = getFirestore(app);

// Export the database for use in other files
export default db;
