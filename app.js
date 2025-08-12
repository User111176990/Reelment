// app.js

// Importar desde Firebase CDN (modo modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Tu configuración de Firebase (usa tus datos aquí)
const firebaseConfig = {
  apiKey: "AIzaSyDdCcoNPdDCOZ9eRAi43o8GFCa0Tu0BUCk",
  authDomain: "reelment-c8a03.firebaseapp.com",
  projectId: "reelment-c8a03",
  storageBucket: "reelment-c8a03.firebasestorage.app",
  messagingSenderId: "323128662170",
  appId: "1:323128662170:web:8a5670a8a9aadecfb26723"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elementos del DOM
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const userSignedOut = document.getElementById('user-signed-out');
const userSignedIn = document.getElementById('user-signed-in');
const userEmailSpan = document.getElementById('user-email');
const errorMessage = document.getElementById('error-message');

// Funciones de login/signup/logout
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

logoutBtn.addEventListener('click', () => {
  signOut(auth);
});

// Detectar cambio de estado de autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    userSignedOut.style.display = 'none';
    userSignedIn.style.display = 'block';
    userEmailSpan.textContent = user.email;
    errorMessage.textContent = '';
    emailInput.value = '';
    passwordInput.value = '';
  } else {
    userSignedOut.style.display = 'block';
    userSignedIn.style.display = 'none';
  }
});
