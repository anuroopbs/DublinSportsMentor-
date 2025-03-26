
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

// Initialize Firebase with proper domain handling
const initFirebase = () => {
  if (typeof firebase !== 'undefined') {
    try {
      // Set auth domain based on environment
      if (window.location.hostname.includes('replit')) {
        firebase.auth().settings.appVerificationDisabledForTesting = true;
        firebaseConfig.authDomain = window.location.hostname;
      }
      
      // Initialize app if not already initialized
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      
      return firebase;
    } catch (error) {
      console.error('Firebase initialization error:', error);
      throw error;
    }
  } else {
    console.error('Firebase SDK not loaded');
    throw new Error('Firebase SDK not loaded');
  }
};

// Initialize Firebase
initFirebase();
