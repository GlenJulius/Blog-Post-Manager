

document.addEventListener("DOMContentLoaded", main);const BASE_URL = "http://localhost:3000/posts";
const postList = document.getElementById("post-list");
const postDetail = document.getElementById("post-detail");

/**
 * Create a DOM element for a post summary.
 * @param {Object} post
 * @returns {HTMLElement}
 */
function createPostListItem(post) {
  const article = document.createElement("article");
  article.className = "post-summary";
  article.tabIndex = 0; // Accessibility
  article.innerHTML = `
    <h3>${post.title}</h3>
    <p><em>by ${post.author}</em></p>
  `;
  article.addEventListener("click", () => handlePostClick(post.id));
  article.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handlePostClick(post.id);
  });
  return article;
}

/**
 * Render all posts in the list.
 */
function displayPosts() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(posts => {
      postList.innerHTML = "";
      posts.forEach(post => {
        postList.appendChild(createPostListItem(post));
      });
    });
}

/**
 * Render a single post in detail.
 * @param {number|string} id
 */
function handlePostClick(id) {
  fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(post => {
      postDetail.innerHTML = `
        <section class="post-detail">
          <h2>${post.title}</h2>
          <img src="${post.image}" alt="${post.title}" width="150"/>
          <p>${post.content}</p>
          <footer><strong>Author:</strong> ${post.author}</footer>
        </section>
      `;
    });
}

/**
 * Handle new post form submission.
 */
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
    .then(() => {
      displayPosts();
      form.reset();
    });
  });
}

/**
 * Initialize the app.
 */
function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener("DOMContentLoaded"), main; 