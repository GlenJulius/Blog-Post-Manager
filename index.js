const BASE_URL = "http://localhost:3000/posts";
const postList = document.getElementById("post-list");
const postDetail = document.getElementById("post-detail");

function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      postList.innerHTML = "";
      posts.forEach(post => {
        const div = document.createElement("div");
        div.textContent = post.title;
        div.style.cursor = "pointer";
        div.addEventListener("click", () => handlePostClick(post.id));
        postList.appendChild(div);
      });
    });
}

function handlePostClick(id) {
  fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      postDetail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><strong>Author:</strong> ${post.author}</p>
        <img src="${post.image}" alt="${post.title}" width="150"/>
      `;
    });
}

function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newPost = {
      title: document.getElementById("new-title").value,
      content: document.getElementById("new-content").value,
      author: document.getElementById("new-author").value,
      image: "https://via.placeholder.com/150"
    };

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
    .then(res => res.json())
    .then(addedPost => {
      displayPosts(); // Refresh list
      form.reset();   // Clear form
    });
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded", main);
