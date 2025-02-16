import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaAR67zhei8L9Gi-t2VbaLQ928r1CV0T4",
  authDomain: "clone-8183b.firebaseapp.com",
  projectId: "clone-8183b",
  storageBucket: "clone-8183b.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "948777916834",
  appId: "1:948777916834:web:d1acd2d69c7aaf807cbafb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const database = getFirestore(app);
