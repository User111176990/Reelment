// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdCcoNPdDCOZ9eRAi43o8GFCa0Tu0BUCk",
    authDomain: "reelment-c8a03.firebaseapp.com",
    projectId: "reelment-c8a03",
    storageBucket: "reelment-c8a03.appspot.com",
    messagingSenderId: "323128662170",
    appId: "1:323128662170:web:8a5670a8a9aadecfb26723"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
