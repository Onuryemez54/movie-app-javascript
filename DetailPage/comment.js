const form = document.getElementById("comment-form");
const userName = document.getElementById("username");
const comment = document.getElementById("comment");
const formContainer = document.getElementById("form-section-container");
const commentSection = document.getElementById("comment-section");
const ratings = document.querySelectorAll(".form-group input[type=radio]");
const clearButton = document.getElementById("clear-btn");

//rating section

function getRatingValue(items) {
  let ratingValue;

  items.forEach((item) => {
    if (item.checked) {
      ratingValue = item.value;
    }
  });

  return ratingValue;
}

function getStarItems(ratingLength) {
  const starItems = [];

  for (let i = 1; i <= ratingLength; i++) {
    const starItem = document.createElement("i");
    starItem.classList.add("fa-regular", "fa-star", "checked");
    starItems.push(starItem);
  }
  return starItems;
}

//form-section

form.addEventListener("submit", addComment);
document.addEventListener("DOMContentLoaded", loadAllCommentsToUI);

function addComment(e) {
  e.preventDefault();

  const userNameValue = userName.value.trim();
  const commentValue = comment.value.trim();
  const ratingValue = getRatingValue(ratings);
  const time = new Date().toLocaleString();

  if (userNameValue === "") {
    showAlert("Please fill in all fields", "alert--failed");
  } else if (commentValue === "") {
    showAlert("Please fill in all fields", "alert--failed");
  } else if (ratingValue === undefined) {
    showAlert("Please rate the movie", "alert--warning");
  } else {
    addCommentToUI(userNameValue, commentValue, ratingValue, time);
    showAlert("Your comment has been added successfully", "alert--success");
    addCommentToLocal(userNameValue, commentValue, ratingValue, time);
  }
}

function showAlert(message, className) {
  const alerDiv = document.createElement("div");
  alerDiv.classList.add("alert", className);
  const alerText = document.createTextNode(message);
  alerDiv.appendChild(alerText);
  formContainer.appendChild(alerDiv);

  setTimeout(() => {
    alerDiv.remove();
  }, 1000);
}

function addCommentToUI(nameValue, commentValue, ratingValue, time) {
  commentSection.classList.add("active");
  clearButton.style.display = "block";

  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment-div");

  const removeIcon = document.createElement("span");
  removeIcon.classList.add("remove-icon");
  removeIcon.textContent = "X";

  commentDiv.appendChild(removeIcon);

  const commentHeader = document.createElement("div");
  commentHeader.classList.add("comment-header");

  const user = document.createElement("h3");
  user.classList.add("user-name");
  user.textContent = nameValue;

  const commentTime = document.createElement("span");
  commentTime.classList.add("comment-time");
  commentTime.textContent = time;

  commentHeader.appendChild(user);
  commentHeader.appendChild(commentTime);

  const stars = getStarItems(ratingValue);

  const starDiv = document.createElement("div");
  starDiv.classList.add("star-container");

  stars.forEach((star) => starDiv.appendChild(star));

  commentDiv.appendChild(starDiv);

  const userComment = document.createElement("p");
  userComment.classList.add("user-comment");
  userComment.textContent = commentValue;

  commentDiv.appendChild(commentHeader);
  commentDiv.appendChild(userComment);
  commentSection.appendChild(commentDiv);

  userName.value = "";
  comment.value = "";
  ratings.forEach((item) => (item.checked = false));
}

//comment delete section

commentSection.addEventListener("click", deleteToComment);

function deleteToComment(e) {
  if (e.target.className === "remove-icon") {
    e.target.parentElement.remove();
  }
  if (commentSection.firstElementChild.nextElementSibling === null) {
    commentSection.innerHTML = "";
    clearButton.style.display = "none";
  }

  deleteCommentToLocal(
    e.target.nextElementSibling.nextElementSibling.firstElementChild
      .textContent,
    e.target.nextElementSibling.nextElementSibling.nextElementSibling
      .textContent
  );
}

//localStorage section -----

//uniqe key
const commentsKey = `comments_${movieId}`;
// console.log("id:", movieId);

function getCommentsFromStorage() {
  let comments = JSON.parse(localStorage.getItem(commentsKey)) || [];

  return comments;
}

// adding comment to Local

function addCommentToLocal(name, comment, rating, time) {
  let comments = getCommentsFromStorage();

  let commentObject = { name, comment, rating, time };

  if (name !== "") {
    comments = [...comments, commentObject];
  }

  localStorage.setItem(commentsKey, JSON.stringify(comments));
}

//delete comment to local

function deleteCommentToLocal(userName, userComment) {
  let comments = getCommentsFromStorage();

  comments = comments.filter((comment) => comment.name !== userName);

  localStorage.setItem(commentsKey, JSON.stringify(comments));
}

// load All comment to UI from local

function loadAllCommentsToUI() {
  let comments = getCommentsFromStorage();
  comments.forEach((item) => {
    addCommentToUI(item.name, item.comment, item.rating, item.time);
  });
}

// clear all comment from local

clearButton.addEventListener("click", () => {
  while (commentSection.firstElementChild !== null) {
    commentSection.removeChild(commentSection.firstElementChild);
  }
  localStorage.removeItem(commentsKey);
  clearButton.style.display = "none";
  showAlert("All comment has been deleted", "alert--info");
});
