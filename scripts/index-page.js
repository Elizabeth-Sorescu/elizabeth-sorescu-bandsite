// JS for comment section
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

// This is a function that generates a container of each grouo of comments:
async function generateComment(comment, mainCommentContainer) {
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

  let deleteButton = document.createElement("button"); //new
  deleteButton.classList.add("delete-btn");
  deleteButton.innerText = "DELETE";
  commentPostBox.appendChild(deleteButton); //up to here new

  //This is the delete button event listener
  deleteButton.addEventListener("click", async function (e) {
    e.preventDefault();
    await delComment(comment.id);
  });
}

// This is an event handler of button when invoked:
let commentButton = document.getElementById("comment-btn");
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = "";
}

// This is the Button EventListener
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
      commentLabel.innerText = "Comment is required";
      userComment.setAttribute("style", "border-color:#D22D2D");
    } else {
      userComment.setAttribute("style", "border-color:$secondary-two-color");
    }
  } else {
    const comment = {
      name: nameInput,
      timestamp: commentDated,
      comment: commentInput,
    };
    userName.value = "";
    nameLabel.innerText = "";
    userComment.value = "";
    commentLabel.innerText = "";
    userComment.setAttribute("style", "border-color:$secondary-two-color");
    userName.setAttribute("style", "border-color:$secondary-two-color");
    userComments.unshift(comment);
    clearBox("default-comments");
    for (let comment of userComments) {
      await generateComment(comment, mainCommentContainer);
    }
    location.reload();
  }
});
