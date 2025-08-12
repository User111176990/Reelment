import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const userEmailSpan = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');
const newPostBtn = document.getElementById('new-post-btn');
const postsList = document.getElementById('posts-list');

function renderPosts(posts) {
  postsList.innerHTML = "";
  posts.forEach(post => {
    const li = document.createElement('li');
    li.textContent = `${post.user}: ${post.content}`;
    li.style.padding = "8px";
    li.style.backgroundColor = "rgba(255,255,0,0.15)";
    li.style.marginBottom = "6px";
    li.style.borderRadius = "6px";
    postsList.appendChild(li);
  });
}

onAuthStateChanged(auth, user => {
  if (user) {
    userEmailSpan.textContent = user.email;

    // Escuchar cambios en la colección 'posts' ordenados por fecha descendente
    const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    onSnapshot(postsQuery, (snapshot) => {
      const posts = [];
      snapshot.forEach(doc => {
        posts.push(doc.data());
      });
      renderPosts(posts);
    });
  } else {
    window.location.href = "index.html";
  }
});

logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});

newPostBtn.addEventListener('click', () => {
  window.location.href = "newpost.html";
});
