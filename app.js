import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./styles.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Cargar posts al montar componente
  useEffect(() => {
    async function loadPosts() {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    loadPosts();
  }, []);

  // Función para publicar
  const handlePublish = async () => {
    if (!newPost.trim()) return;
    await addDoc(collection(db, "posts"), {
      author: "Alex",
      content: newPost,
      likes: 0,
      comments: []
    });
    setNewPost("");
    const querySnapshot = await getDocs(collection(db, "posts"));
    setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div className="container">
      <h1>Reelment</h1>

      <textarea
        className="input-post"
        placeholder="Escribe algo sobre tu mascota..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />

      <button className="btn-publish" onClick={handlePublish}>
        Publicar
      </button>

      <div className="posts">
        {posts.length === 0 && <p>No hay publicaciones todavía.</p>}
        {posts.map(post => (
          <div key={post.id} className="post">
            <strong>{post.author}:</strong> {post.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
