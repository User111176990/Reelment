import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdCcoNPdDCOZ9eRAi43o8GFCa0Tu0BUCk",
  authDomain: "reelment-c8a03.firebaseapp.com",
  projectId: "reelment-c8a03",
  storageBucket: "reelment-c8a03.firebasestorage.app",
  messagingSenderId: "323128662170",
  appId: "1:323128662170:web:8a5670a8a9aadecfb26723"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const errorMessage = document.getElementById('error-message');

loginBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
      errorMessage.textContent = error.message;
    });
});

signupBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  createUserWithEmailAndPassword(auth, email, password)
    .catch(error => {
      errorMessage.textContent = error.message;
    });
});

onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = 'home.html';
  }
});
