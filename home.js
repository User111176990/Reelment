import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const auth = getAuth();

const userEmailSpan = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');
const postsList = document.getElementById('posts-list');

const posts = [
  { id: 1, user: "usuario1@example.com", content: "¡Hola, este es mi primer post en Reelment!" },
  { id: 2, user: "usuario2@example.com", content: "¿Alguien quiere jugar a Fortnite?" },
  { id: 3, user: "usuario3@example.com", content: "Reelment mola mucho, ¡vamos a hacer comunidad!" }
];

function renderPosts() {
  postsList.innerHTML = "";
  posts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = `${post.user}: ${post.content}`;
    postsList.appendChild(li);
  });
}

onAuthStateChanged(
