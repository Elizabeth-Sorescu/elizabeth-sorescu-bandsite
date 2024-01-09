// JS for comment section
let userName = document.querySelector("#name");
let userComment = document.querySelector("#comment");
const date = new Date();
let mainCommentContainer = document.querySelector(".comment-post");
let nameLabel = document.querySelector(".name-req");
let commentLabel = document.querySelector(".comment-req");
// const defaultComment1 = {
//   userName: "Miles Acosta",
//   timeStamp: "12/20/2020",
//   userComment:
//     "I can't stop listening. Every time I hear one of their songs - the " +
//     "vocals - it gives me goosebumps. Shivers straight down my spine. " +
//     " What a beautiful expression of creativity. Can't get enough.",
// };

// const defaultComment2 = {
//   userName: "Emilie Beach",
//   timeStamp: "01/09/2021",
//   userComment:
//     "I feel blessed to have seen them in person. What a show! They were " +
//     "just perfection. If there was one day of my life I could relive, " +
//     " this would be it. What an incredible day.",
// };

// const defaultComment3 = {
//   userName: "Connor Walton",
//   timeStamp: "12/17/2021",
//   userComment:
//     "This is art. This is inexplicable magic expressed in the purest way, " +
//     " everything that makes up this majestic work deserves reverence. Let " +
//     "  us appreciate this for what it is and what it contains.",
// };

// let arrayComments = [defaultComment1, defaultComment2, defaultComment3];

// for (let comment of arrayComments) {
//   generateComment(comment, mainCommentContainer);
// }

let arrayComments = null;

arrayComments = bandSiteApi.getComments().then((result) => {
  arrayComments = result;
});

// This is a function that generates a container of each grouo of comments:
function generateComment(comment, mainCommentContainer) {
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
}

// This is an event handler of button when invoked:
let commentButton = document.getElementById("comment-btn");
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = "";
}

// Time utility formatter for dates
function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

// This is the Button EventListener
commentButton.addEventListener("click", async function (e) {
  e.preventDefault();
  // debugger;
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

    arrayComments.unshift(comment);

    clearBox("default-comments");
    for (let comment of arrayComments) {
      generateComment(comment, mainCommentContainer);
    }
  }
});
