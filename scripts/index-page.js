let userName = document.querySelector("#name");
let userComment = document.querySelector("#comment");
const date = new Date();
let mainCommentContainer = document.querySelector(".comment-post");

const defaultComment1 = {
  userName: "Miles Acosta",
  timeStamp: "12/20/2020",
  userComment:
    "I can't stop listening. Every time I hear one of their songs - the " +
    "vocals - it gives me goosebumps. Shivers straight down my spine. " +
    " What a beautiful expression of creativity. Can't get enough.",
};

const defaultComment2 = {
  userName: "Emilie Beach",
  timeStamp: "01/09/2021",
  userComment:
    "I feel blessed to have seen them in person. What a show! They were " +
    "just perfection. If there was one day of my life I could relive, " +
    " this would be it. What an incredible day.",
};

const defaultComment3 = {
  userName: "Connor Walton",
  timeStamp: "12/17/2021",
  userComment:
    "This is art. This is inexplicable magic expressed in the purest way, " +
    " everything that makes up this majestic work deserves reverence. Let " +
    "  us appreciate this for what it is and what it contains.",
};

let arrayComments = [defaultComment1, defaultComment2, defaultComment3];

for (let comment of arrayComments) {
  generateComment(comment, mainCommentContainer);
}
// Here are the functions used:
function generateComment(comment, mainCommentContainer) {
  let commentPostBox = document.createElement("div");
  commentPostBox.classList.add("comment-post__box");
  mainCommentContainer.appendChild(commentPostBox);

  let commentPostBoxImg = document.createElement("div");
  commentPostBoxImg.classList.add("comment-post__box-img");
  commentPostBox.appendChild(commentPostBoxImg);

  let commentPostGrp1 = document.createElement("div");
  commentPostGrp1.classList.add("comments-post__grp1");
  commentPostBox.appendChild(commentPostGrp1);

  let commentPostGrp1Name = document.createElement("label");
  commentPostGrp1Name.classList.add("comments-post__grp1-name");
  commentPostGrp1.appendChild(commentPostGrp1Name);
  commentPostGrp1Name.innerText = comment.userName;

  let commentPostGrp1Date = document.createElement("div");
  commentPostGrp1Date.classList.add("comments-post__grp1-date");
  commentPostGrp1.appendChild(commentPostGrp1Date);
  commentPostGrp1Date.innerText = comment.timeStamp;

  let commentPostGrp2 = document.createElement("p");
  commentPostGrp2.classList.add("comments-post__grp2");
  commentPostBox.appendChild(commentPostGrp2);
  commentPostGrp2.innerText = comment.userComment;
}

// Second Function
let commentButton = document.getElementById("comment-btn");
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = "";
}

commentButton.addEventListener("click", function (e) {
  e.preventDefault();
  //let target = e.target;
  //if (target.id === "comment-btn") {
  let nameInput = userName.value;
  let commentDated = date.toLocaleDateString("en-US");
  let commentInput = userComment.value;

  const comment = {
    userName: nameInput,
    timeStamp: commentDated,
    userComment: commentInput,
  };
  userName.value = "";
  userComment.value = "";

  arrayComments.unshift(comment);

  clearBox("default-comments");
  for (let comment of arrayComments) {
    generateComment(comment, mainCommentContainer);
  }
  //}
});
