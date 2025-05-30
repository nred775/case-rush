// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDwL9moGwLDDyYcLiLJd3u9rPpfLz4do-0",
  authDomain: "caserush-27b75.firebaseapp.com",
  projectId: "caserush-27b75",
  storageBucket: "caserush-27b75.firebasestorage.app",
  messagingSenderId: "349327871738",
  appId: "1:349327871738:web:3cb124c793f6bccdb8c343",
  measurementId: "G-VKYDBK5WJV",
  databaseURL: "https://caserush-27b75-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

// ✅ DEBUG ONLY: expose to window for console testing
if (typeof window !== 'undefined') {
  window.auth = auth;
  window.db = db;
  window.rtdb = rtdb;
}

export { auth, db, rtdb };
