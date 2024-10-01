import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Import Firebase Authentication and Google Auth Provider
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAHok0P1aLQB4-j-LV2CQc0w0tZSFFIBTo",
  authDomain: "auth-1780c.firebaseapp.com",
  projectId: "auth-1780c",
  storageBucket: "auth-1780c.appspot.com",
  messagingSenderId: "128776273497",
  appId: "1:128776273497:web:3f6e36cf4da6df6cf93b48",
  measurementId: "G-B1JZVBW3S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app); // Export the auth object
export const db = getFirestore(app); // Export Firestore

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider(); // Export Google Auth Provider
