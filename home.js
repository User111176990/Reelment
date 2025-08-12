import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// 🔹 Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDdCcoNPdDCOZ9eRAi43o8GFCa0Tu0BUCk",
  authDomain: "reelment-c8a03.firebaseapp.com",
  projectId: "reelment-c8a03",
  storageBucket: "reelment-c8a03.firebasestorage.app",
  messagingSenderId: "323128662170",
  appId: "1:323128662170:web:8a5670a8a9aadecfb26723"
};

// 🔹 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
