// const body = document.body;
// const section = document.createElement("section");
// section.classList.add("shows-section");
// body.appendChild(section);
// const header = document.createElement("header");
// header.innerText = "Shows";
// section.appendChild(header);
// -----------------------------------------------------
// console.log(section);
// let section = document.createElement(`section`);
// section.classList.add(`.shows-section`);
// document.appendChild(section);
// body.appendChild(section);
// alert("document:" + document.getElementsByTagName("body"));
// let body = document.getElementsByTagName("body");
// let div = document.createElement("div");
// div.classList.add("test-div");
// body.appendChild(div);
let parent = document.querySelector(".shows");
let newDiv = document.createElement("div");
newDiv.classList.add("shows-group");
parent.appendChild(newDiv);

let show1 = {
  date: "Mon Sept 06 2021",
  venue: "Ronald Lane",
  location: "San Francisco, CA",
};
let show2 = {
  date: "Tue Sept 21 2021",
  venue: "Pier 3 East",
  location: "San Francisco, CA",
};
let arrayShows = [];
arrayShows.push(show1);
arrayShows.push(show2);

console.log(arrayShows);

for (let show of arrayShows) {
  newDiv.appendChild(sho);
}
