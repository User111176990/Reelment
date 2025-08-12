// Sustituye estos valores con los que te da Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const userSignedOut = document.getElementById('user-signed-out');
const userSignedIn = document.getElementById('user-signed-in');
const userEmailSpan = document.getElementById('user-email');
const errorMessage = document.getElementById('error-message');

loginBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      errorMessage.textContent = error.message;
    });
});

signupBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .catch(error => {
      errorMessage.textContent = error.message;
    });
});

logoutBtn.addEventListener('click', () => {
  auth.signOut();
});

auth.onAuthStateChanged(user => {
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
