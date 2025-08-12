import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdCcoNPdDCOZ9eRAi43o8GFCa0Tu0BUCk",
  authDomain: "reelment-c8a03.firebaseapp.com",
  projectId: "reelment-c8a03",
  storageBucket: "reelment-c8a03.firebasestorage.app",
  messagingSenderId: "323128662170",
  appId: "1:323128662170:web:8a5670a8a9aadecfb26723"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
