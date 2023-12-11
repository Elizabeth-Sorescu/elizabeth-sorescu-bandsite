// const title = document.getElementsByClassName("nav__header__link");
// console.log(title);

// comments={
//     comment1={
//         name: "Connor Walton",
//         timeStamp: "02/17/2021",
//         comment: "This is art. This is inexplicable magic expressed in the purest way,
//     everything that makes up this majestic work deserves reverence. Let
//     us appreciate this for what it is and what it contains.", }
// }
// REQUIREMENTS:
// #1. have an array with 3 default comment objects to start;
// comment must have a name, timestamp, & comment text
// let name =
// let commentArray = new Comment(name, time, commentText);
// #2. have a function that takes a one object as parameter;
// then displays it on the page using DOM Manipulation
// function Comment(name, time, commentText) {
//   this.name = name;
//   this.time = time;
//   this.commentText = commentText;
// }

// #3. all dynamic HTML must be added to DOM via DOM Methods for indiividual elements
// avoid bulk assigning stringfield HTML using innerHTML

// #4. use HTML form with follwing functionality:
// submit using addEventListener
// prevents reloading the page when submitting a new comment
// constructs new comment object
// PUSHES a new comment object to an array of comments
// Clear all comments from the page
// new comments will be posted on top of the 3 default comments
// re-renders to the page all comments from the comment array
// clears the input fields after submitting a new comment
// const form = document.querySelector(".comments__form");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const formData = new FormData(form);
//   for (item of formData) {
//     console.log(item[0], item[1]);
//   }
// });
// let firstDefaultComment = document.querySelector(".comments-post__grp2-1");
// console.log(firstDefaultComment.innerText);
