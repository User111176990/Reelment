import { auth, storage, db } from "./firebase-config.js";
import { 
  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { 
  ref, uploadBytes, getDownloadURL 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import { 
  collection, addDoc, getDocs, query, where, deleteDoc, doc, Timestamp 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Elementos
const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

const postStoryBtn = document.getElementById("post-story-btn");
const storyUpload = document.getElementById("story-upload");
const storiesContainer = document.getElementById("stories-container");

const postExploreBtn = document.getElementById("post-explore-btn");
const exploreUpload = document.getElementById("explore-upload");
const exploreContainer = document.getElementById("explore-container");

const feedBtn = document.getElementById("feed-btn");
const exploreBtn = document.getElementById("explore-btn");
const storyFeedSection = document.getElementById("story-feed");
const exploreSection = document.getElementById("explore-section");

// Registro
signupBtn.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (e) {
    errorMessage.textContent = e.message;
  }
});

// Login
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
  } catch (e) {
    errorMessage.textContent = e.message;
  }
});

// Logout
logoutBtn.addEventListener("click", () => signOut(auth));

// Cambio de sesión
onAuthStateChanged(auth, user => {
  if (user) {
    authSection.classList.add("hidden");
    appSection.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
    cargarStories();
    cargarExplorar();
  } else {
    authSection.classList.remove("hidden");
    appSection.classList.add("hidden");
    logoutBtn.classList.add("hidden");
  }
});

// Publicar Story
postStoryBtn.addEventListener("click", async () => {
  if (storyUpload.files.length > 0) {
    const file = storyUpload.files[0];
    const storageRef = ref(storage, `stories/${auth.currentUser.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "stories"), {
      user: auth.currentUser.email,
      url: url,
      createdAt: Timestamp.now()
    });
    cargarStories();
  }
});

// Publicar en Explorar
postExploreBtn.addEventListener("click", async () => {
  if (exploreUpload.files.length > 0) {
    const file = exploreUpload.files[0];
    const storageRef = ref(storage, `explore/${auth.currentUser.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, "explore"), {
      user: auth.currentUser.email,
      url: url,
      createdAt: Timestamp.now()
    });
    cargarExplorar();
  }
});

// Cargar Stories (3 días)
async function cargarStories() {
  storiesContainer.innerHTML = "";
  const q = query(collection(db, "stories"));
  const querySnapshot = await getDocs(q);

  const ahora = Timestamp.now().seconds;
  querySnapshot.forEach(async (docSnap) => {
    const data = docSnap.data();
    const expiracion = data.createdAt.seconds + (3 * 24 * 60 * 60);
    if (ahora > expiracion) {
      await deleteDoc(doc(db, "stories", docSnap.id));
    } else {
      const img = document.createElement("img");
      img.src = data.url;
      storiesContainer.appendChild(img);
    }
  });
}

// Cargar Explorar
async function cargarExplorar() {
  exploreContainer.innerHTML = "";
  const q = query(collection(db, "explore"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const img = document.createElement("img");
    img.src = data.url;
    exploreContainer.appendChild(img);
  });
}

// Navegación
feedBtn.addEventListener("click", () => {
  storyFeedSection.classList.remove("hidden");
  exploreSection.classList.add("hidden");
});

exploreBtn.addEventListener("click", () => {
  storyFeedSection.classList.add("hidden");
  exploreSection.classList.remove("hidden");
});
