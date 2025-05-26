// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwL9moGwLDDyYcLiLJd3u9rPpfLz4do-0",
  authDomain: "caserush-27b75.firebaseapp.com",
  projectId: "caserush-27b75",
  storageBucket: "caserush-27b75.firebasestorage.app",
  messagingSenderId: "349327871738",
  appId: "1:349327871738:web:3cb124c793f6bccdb8c343",
  measurementId: "G-VKYDBK5WJV"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
