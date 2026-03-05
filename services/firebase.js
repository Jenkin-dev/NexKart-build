import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwqAbqF0jowBSx5na53bm9BHtzrkFaVu4",
  authDomain: "nexkart-project.firebaseapp.com",
  projectId: "nexkart-project",
  storageBucket: "nexkart-project.firebasestorage.app",
  messagingSenderId: "104300309502",
  appId: "1:104300309502:android:8d4b998d1dab3c7b016eaf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
