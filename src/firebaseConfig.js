// firebaseConfig.js
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "INSERT_API_KEY",
  authDomain: "INSERT_AUTH_DOMAIN",
  projectId: "INSERT_PROJECT_ID",
  databaseURL: "INSERT_DATABASE_URL",
  storageBucket: "INSERT_STORAGE_BUCKET",
  messagingSenderId: "INSERT_MESSAGING_SENDER_ID",
  appId: "INSERT_APP_ID",
  measurementId: "INSERT_MEASUREMENT_ID"
};

// Initialize Firebase
export default firebaseConfig;
