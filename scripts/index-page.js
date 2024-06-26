const userName = document.querySelector("#name");
const userComment = document.querySelector("#comment");
const date = new Date();
const mainCommentContainer = document.querySelector(".comment-post");
const nameLabel = document.querySelector(".name-req");
const commentLabel = document.querySelector(".comment-req");

let userComments = null;

userComments = bandSiteApi.getComments().then((result) => {
  userComments = result;
});

async function delComment(id) {
  let response = await bandSiteApi.deleteComment(id);
  if (response) {
    let result = await bandSiteApi.getComments();
    if (result) {
      location.reload();
    }
  }
}

async function generateComment(comment, mainCommentContainer) {
  if (comment.name === "" || comment.comment === "") {
    return;
  }
  let commentPostBox = document.createElement("div");
  commentPostBox.classList.add("comments-post");
  mainCommentContainer.appendChild(commentPostBox);

  let commentPostBoxImg = document.createElement("div");
  commentPostBoxImg.classList.add("comments-post__box-img");
  commentPostBox.appendChild(commentPostBoxImg);

  let commentPostGrp1 = document.createElement("div");
  commentPostGrp1.classList.add("comments-post__grp1");
  commentPostBox.appendChild(commentPostGrp1);

  let commentPostGrp1Name = document.createElement("label");
  commentPostGrp1Name.classList.add("comments-post__grp1--name");
  commentPostGrp1.appendChild(commentPostGrp1Name);
  commentPostGrp1Name.innerText = comment.name;

  let commentPostGrp1Date = document.createElement("div");
  commentPostGrp1Date.classList.add("comments-post__grp1--date");
  commentPostGrp1.appendChild(commentPostGrp1Date);
  commentPostGrp1Date.innerText = new Date(
    comment.timestamp
  ).toLocaleDateString("en-US");

  let commentPostGrp2 = document.createElement("p");
  commentPostGrp2.classList.add("comments-post__grp2");
  commentPostBox.appendChild(commentPostGrp2);
  commentPostGrp2.innerText = comment.comment;

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.innerText = "DELETE";
  commentPostBox.appendChild(deleteButton);

  deleteButton.addEventListener("click", async function (e) {
    e.preventDefault();
    await delComment(comment.id);
  });
}

let commentButton = document.getElementById("comment-btn");
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = "";
}

commentButton.addEventListener("click", async function (e) {
  e.preventDefault();
  let comment = {
    name: userName.value,
    comment: userComment.value,
  };
  let result = await bandSiteApi.postComment(comment);

  let nameInput = result.name;
  let commentDated = date.toLocaleDateString("en-US");
  let commentInput = result.comment;

  if (nameInput === "" || commentInput === "") {
    if (nameInput === "") {
      userName.setAttribute("style", "border-color:#D22D2D");
      nameLabel.innerText = "Name is required";
    } else {
      userName.setAttribute("style", "border-color:$secondary-two-color");
    }
    if (commentInput === "") {
      userComment.setAttribute("style", "border-color:#D22D2D");
      commentLabel.innerText = "Comment is required";
    } else {
      userComment.setAttribute("style", "border-color:$secondary-two-color");
    }
  } else {
    const comment = {
      name: nameInput,
      timestamp: commentDated,
      comment: commentInput,
    };

    userComment.setAttribute("style", "border-color:$secondary-two-color");
    userName.setAttribute("style", "border-color:$secondary-two-color");
    userComments.unshift(comment);
    clearBox("default-comments");
    for (let comment of userComments) {
      await generateComment(comment, mainCommentContainer);
    }
    userName.value = "";
    nameLabel.innerText = "";
    userComment.value = "";
    commentLabel.innerText = "";
    location.reload();
  }
});
