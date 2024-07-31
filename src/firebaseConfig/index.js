import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDmYY5qeF9tLxkWQk0KL1XEat3EJdjEW08",
  authDomain: "koreashop-77300.firebaseapp.com",
  databaseURL: "https://koreashop-77300-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "koreashop-77300",
  storageBucket: "koreashop-77300.appspot.com",
  messagingSenderId: "348610950650",
  appId: "1:348610950650:web:245adf053e60a9f6e76043",
  measurementId: "G-1W80H4BT6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
