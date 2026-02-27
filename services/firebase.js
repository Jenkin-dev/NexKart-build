import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Specific configuration for NexKart-project
const firebaseConfig = {
  apiKey: "AIzaSyDwqAbqF0jowBSx5na53bm9BHtzrkFaVu4", //
  authDomain: "nexkart-project.firebaseapp.com",
  projectId: "nexkart-project", //
  storageBucket: "nexkart-project.firebasestorage.app", //
  messagingSenderId: "104300309502", //
  appId: "1:104300309502:android:8d4b998d1dab3c7b016eaf", //
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance for use in your Mobile and OTP screens
export const auth = getAuth(app);
export default app;
