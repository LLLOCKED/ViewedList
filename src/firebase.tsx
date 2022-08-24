import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPAyxjdSiOVODXg6NIdHG-60porDQpgPk",
  authDomain: "watch-list-aa709.firebaseapp.com",
  projectId: "watch-list-aa709",
  storageBucket: "watch-list-aa709.appspot.com",
  messagingSenderId: "704217381633",
  appId: "1:704217381633:web:1b531d7aac198868a9f900",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
