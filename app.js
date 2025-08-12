// app.js
import { auth, db, storage } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { collection, addDoc, query, getDocs, serverTimestamp, where, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// Elements
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const postStoryBtn = document.getElementById("post-story-btn");
const storyFile = document.getElementById("story-file");
const storiesFeed = document.getElementById("stories-feed");
const errorMessage = document.getElementById("error-message");

if (loginBtn) {
    loginBtn.onclick = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            errorMessage.textContent = e.message;
        }
    };
}

if (signupBtn) {
    signupBtn.onclick = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
            errorMessage.textContent = e.message;
        }
    };
}

if (logoutBtn) {
    logoutBtn.onclick = async () => {
        await signOut(auth);
    };
}

// Mostrar stories
async function loadStories() {
    storiesFeed.innerHTML = "";
    const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const now = Date.now();

    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (now - data.createdAt.toMillis() < 3 * 24 * 60 * 60 * 1000) { // 3 días
            const img = document.createElement("img");
            img.src = data.url;
            storiesFeed.appendChild(img);
        } else {
            deleteDoc(doc(db, "stories", docSnap.id));
        }
    });
}

// Publicar story
if (postStoryBtn) {
    postStoryBtn.onclick = async () => {
        const file = storyFile.files[0];
        if (!file) return;

        const storageRef = ref(storage, `stories/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        await addDoc(collection(db, "stories"), {
            url,
            createdAt: serverTimestamp(),
            user: auth.currentUser.email
        });

        loadStories();
    };
}

// Estado de usuario
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("app-section").style.display = "block";
        loadStories();
    } else {
        document.getElementById("auth-section").style.display = "block";
        document.getElementById("app-section").style.display = "none";
    }
});
