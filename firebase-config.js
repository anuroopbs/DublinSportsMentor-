// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4rQpYsVay_5diUtizBUJPobl52VJ7yn4",
  authDomain: "dublin-sports-hub.firebaseapp.com",
  projectId: "dublin-sports-hub",
  storageBucket: "dublin-sports-hub.appspot.com",
  messagingSenderId: "39820720000",
  appId: "1:39820720000:web:fb89bee759d9fdcf96f365",
  measurementId: "G-BXGT20LRNR"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  // Check if Firebase is already initialized
  try {
    firebase.app();
  } catch (e) {
    firebase.initializeApp(firebaseConfig);
  }
} else {
  console.error('Firebase SDK not loaded. Please check your internet connection and try again.');
}
