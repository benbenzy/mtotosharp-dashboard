"use client";
import { getAuth } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

// Load .env variables
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmZKwroUT_-DoshOgwmmmJUzRaooSBelQ",
  authDomain: "mtotosharp-89c7d.firebaseapp.com",
  projectId: "mtotosharp-89c7d",
  storageBucket: "mtotosharp-89c7d.appspot.com",
  messagingSenderId: "400805567161",
  appId: "1:400805567161:web:1424d6d673a5cb86235968",
  measurementId: "G-33ZDHKMN80",
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const firebaseAuth = getAuth(firebaseApp);
