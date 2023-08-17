import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfh3b5WPy6gRv1N_-RFihEC8EGKU4zNzY",
  authDomain: "crapp-7c62c.firebaseapp.com",
  databaseURL: "https://crapp-7c62c.firebaseio.com",
  projectId: "crapp-7c62c",
  storageBucket: "crapp-7c62c.appspot.com",
  messagingSenderId: "841688819271",
  appId: "1:841688819271:web:6649c30068bb72c5d3b362",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
