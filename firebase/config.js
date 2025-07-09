// firebase/config.js
// Firebase SDK configuration and initialization.
// IMPORTANT: Replace placeholder values with your actual Firebase project credentials.

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage"; // If you plan to use Firebase Storage

// Your web app's Firebase configuration
// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional, for Google Analytics
};

// Initialize Firebase
// We need to check if an app is already initialized to prevent errors during HMR (Hot Module Replacement) in Next.js.
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // If already initialized, use that app
}

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app); // Optional: specify region e.g. getFunctions(app, 'us-central1')
const storage = getStorage(app); // Optional: if you need Firebase Storage

// Export the initialized services
export { app, auth, db, functions, storage, firebaseConfig };

// NOTE: For production, it is highly recommended to use environment variables
// for your Firebase config and add this file to .gitignore to prevent exposing sensitive keys.
// Example using environment variables:
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
// };
// Make sure to prefix environment variables with NEXT_PUBLIC_ to expose them to the browser.
