// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDqjoiQlTS2DyoWAb13UtKLzl-1izr987I",
  authDomain: "sport-pro-b7dfd.firebaseapp.com",
  projectId: "sport-pro-b7dfd",
  storageBucket: "sport-pro-b7dfd.firebasestorage.app",
  messagingSenderId: "82051175034",
  appId: "1:82051175034:web:3f4be1ce819a2f859361c3",
  measurementId: "G-LM76NJ6N8L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);