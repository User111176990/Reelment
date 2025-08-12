import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const postContent = document.getElementById('post-content');
const postBtn = document.getElementById('post-btn');
const postError = document.getElementById('post-error');
const backBtn = document.getElementById('back-btn');

let currentUser = null;

onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
  } else {
    window.location.href = "index.html";
  }
});

postBtn.addEventListener('click', async () => {
  const content = postContent.value.trim();

  if (!content) {
    postError.textContent = "El contenido no puede estar vacío.";
    return;
  }

  postError.textContent = "";

  try {
    await addDoc(collection(db, "posts"), {
      user: currentUser.email,
      content: content,
      createdAt: serverTimestamp()
    });

    postContent.value = "";
    alert("Post publicado correctamente.");
  } catch (error) {
    postError.textContent = "Error al publicar: " + error.message;
  }
});

backBtn.addEventListener('click', () => {
  window.location.href = "home.html";
});
