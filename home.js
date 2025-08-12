// home.js

import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const auth = getAuth();

// Elementos del DOM
const userEmailSpan = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');
const postsList = document.getElementById('posts-list');

// Ejemplo de posts para el feed (puedes cambiarlos o hacerlos dinámicos más adelante)
const posts = [
  { id: 1, user: "usuario1@example.com", content: "¡Hola, este es mi primer post en Reelment!" },
  { id: 2, user: "usuario2@example.com", content: "¿Alguien quiere jugar a Fortnite?" },
  { id: 3, user: "usuario3@example.com", content: "Reelment mola mucho, ¡vamos a hacer comunidad!" }
];

// Mostrar posts en el feed
function renderPosts() {
  postsList.innerHTML = "";
  posts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = `${post.user}: ${post.content}`;
    postsList.appendChild(li);
  });
}

// Detectar el usuario conectado y mostrar su email
onAuthStateChanged(auth, user => {
  if (user) {
    userEmailSpan.textContent = user.email;
    renderPosts();
  } else {
    // Si no hay usuario, volver a login
    window.location.href = "index.html";
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}); 
