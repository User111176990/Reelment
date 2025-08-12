function renderPosts(posts) {
  postsList.innerHTML = "";
  posts.forEach(post => {
    const li = document.createElement('li');
    li.style.padding = "8px";
    li.style.backgroundColor = "rgba(255,255,0,0.15)";
    li.style.marginBottom = "6px";
    li.style.borderRadius = "6px";

    const userSpan = document.createElement('strong');
    userSpan.textContent = post.user + ": ";
    li.appendChild(userSpan);

    if (post.content) {
      const contentSpan = document.createElement('span');
      contentSpan.textContent = post.content;
      li.appendChild(contentSpan);
    }

    if (post.imageUrl) {
      const img = document.createElement('img');
      img.src = post.imageUrl;
      img.alt = "Imagen del post";
      img.style.display = "block";
      img.style.marginTop = "8px";
      img.style.maxWidth = "100%";
      img.style.borderRadius = "8px";
      li.appendChild(img);
    }

    postsList.appendChild(li);
  });
}
