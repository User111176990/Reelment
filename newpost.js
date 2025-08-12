import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDdCcoNPdDCOZ9eRAi43o8GFCa0Tu0BUCk",
  authDomain: "reelment-c8a03.firebaseapp.com",
  projectId: "reelment-c8a03",
  storageBucket: "reelment-c8a03.appspot.com",
  messagingSenderId: "323128662170",
  appId: "1:323128662170:web:8a5670a8a9aadecfb26723"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const postContent = document.getElementById('post-content');
const postBtn = document.getElementById('post-btn');
const postError = document.getElementById('post-error');
const backBtn = document.getElementById('back-btn');
const imageUpload = document.getElementById('image-upload');

let currentUser = null;

onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
  } else {
    window.location.href = "index.html";
  }
});

backBtn.addEventListener('click', () => {
  window.location.href = "home.html";
});

postBtn.addEventListener('click', async () => {
  const content = postContent.value.trim();

  if (!content && !imageUpload.files.length) {
    postError.textContent = "Escribe algo o selecciona una imagen.";
    return;
  }

  postError.textContent = "";
  postBtn.disabled = true;
  postBtn.textContent = "Publicando...";

  try {
    let imageUrl = null;

    if (imageUpload.files.length > 0) {
      const file = imageUpload.files[0];
      const storageRef = ref(storage, `post_images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "posts"), {
      user: currentUser.email,
      content: content || "",
      imageUrl: imageUrl,
      createdAt: serverTimestamp()
    });

    postContent.value = "";
    imageUpload.value = "";
    alert("Post publicado correctamente.");
  } catch (error) {
    postError.textContent = "Error al publicar: " + error.message;
  } finally {
    postBtn.disabled = false;
    postBtn.textContent = "Publicar";
  }
});
