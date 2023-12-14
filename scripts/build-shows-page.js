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
let show3 = {
  date: "Fri Oct 15 2021",
  venue: "View Lounge",
  location: "San Francisco, CA",
};
let show4 = {
  date: "Sat Nov 06 2021",
  venue: "Hyatt Agency",
  location: "San Francisco, CA",
};
let show5 = {
  date: "Fri Nov 26 2021",
  venue: "Moscow Center",
  location: "San Francisco, CA",
};
let show6 = {
  date: "Wed Dec 15 2021",
  venue: "Press Club",
  location: "San Francisco, CA",
};

let arrayShows = [];
arrayShows.push(show1);
arrayShows.push(show2);
arrayShows.push(show3);
arrayShows.push(show4);
arrayShows.push(show5);
arrayShows.push(show6);

let ref = document.getElementById("bnd-footer");
let newElem = ref.insertAdjacentHTML(
  "beforebegin",
  "<section class=shows></section>"
);
ref.insertAdjacentHTML("beforebegin", "<!-- FOOTER SECTION -->");

let commentsContainer = document.querySelector(".shows");
commentsContainer.insertAdjacentHTML(
  "beforebegin",
  "<!-- COMMENTS SECTION -->"
);

let heroBackgroundImg = document.querySelector(".hero-img");

let songAlbum = document.createElement("p");
songAlbum.classList.add("song-album");
heroBackgroundImg.appendChild(songAlbum);
songAlbum.innerText = "Moonlight Soul Album";

let heading = document.createElement("h2");
heading.classList.add("shows-heading");
commentsContainer.appendChild(heading);
heading.innerText = "Shows";

let divGroup = document.createElement("div");
divGroup.classList.add("shows-group");
commentsContainer.appendChild(divGroup);

// Group of Labels for Large screen
let grpLabels = document.createElement("div");
grpLabels.classList.add("shows-group__labels");
divGroup.appendChild(grpLabels);

let dateLabel = document.createElement("label");
dateLabel.classList.add("shows-group__label");
grpLabels.appendChild(dateLabel);
dateLabel.innerText = "DATE";

let venueLabel = document.createElement("label");
venueLabel.classList.add("shows-group__label");
grpLabels.appendChild(venueLabel);
venueLabel.innerText = "VENUE";

let locationLabel = document.createElement("label");
locationLabel.classList.add("shows-group__label");
grpLabels.appendChild(locationLabel);
locationLabel.innerText = "LOCATION";

// Event Function
function generateDiv(show, divGroup) {
  let divSubGroup = document.createElement("div");
  divSubGroup.classList.add("show");
  divGroup.appendChild(divSubGroup);

  // DATE
  let labelDateCaption = document.createElement("label");
  labelDateCaption.classList.add("main-label");
  labelDateCaption.classList.add("date");
  divSubGroup.appendChild(labelDateCaption);
  labelDateCaption.innerText = "DATE";

  let labelDateText = document.createElement("label");
  labelDateText.classList.add("main-value");
  labelDateText.classList.add("date-value");
  divSubGroup.appendChild(labelDateText);
  labelDateText.innerText = show.date;

  // VENUE
  let labelVenueCaption = document.createElement("label");
  labelVenueCaption.classList.add("main-label");
  labelVenueCaption.classList.add("venue");
  divSubGroup.appendChild(labelVenueCaption);
  labelVenueCaption.innerText = "VENUE";

  let labelVenueText = document.createElement("label");
  labelVenueText.classList.add("main-value");
  labelVenueText.classList.add("venue-value");
  divSubGroup.appendChild(labelVenueText);
  labelVenueText.innerText = show.venue;

  // LOCATION
  let labelLocationCaption = document.createElement("label");
  labelLocationCaption.classList.add("main-label");
  labelLocationCaption.classList.add("location");
  divSubGroup.appendChild(labelLocationCaption);
  labelLocationCaption.innerText = "LOCATION";

  let labelLocationText = document.createElement("label");
  labelLocationText.classList.add("main-value");
  labelLocationText.classList.add("location-value");
  divSubGroup.appendChild(labelLocationText);
  labelLocationText.innerText = show.location;

  // BUTTON
  let btnDiv = document.createElement("div");
  btnDiv.classList.add("main-value");
  btnDiv.classList.add("buytcktbtn-value");
  btnDiv.classList.add("buy-tckt");
  divSubGroup.appendChild(btnDiv);

  let button = document.createElement("button");
  button.classList.add("buy-tckt__btn");
  btnDiv.appendChild(button);
  button.innerText = "buy tickets";
}

for (let show of arrayShows) {
  generateDiv(show, divGroup);
}

// Click Event Handler

for (let i = 0; i < arrayShows.length; i++) {
  let divElements = document.getElementsByClassName("show");
  let divElement = divElements[i];

  divElement.addEventListener("click", function () {
    divElement.setAttribute("style", "background-color:#e1e1e1");
    clearHighlights(i);
  });
  let isHovered = false;
  divElement.addEventListener("mouseover", function () {
    isHovered = true;
    if (divElement.hasAttribute("style", "background:none")) {
      divElement.setAttribute("style", "background:#FFFF00");
    }
    clearHighlights(i);
  });
  divElement.addEventListener("mouseout", function () {
    if (!isClicked) {
      divElement.removeAttribute("style");
    }
  });
}

function clearHighlights(index) {
  for (let i = 0; i <= arrayShows.length; i++) {
    let divElement = document.getElementsByClassName("show")[i];
    if (index !== i) {
      divElement.setAttribute("style", "background-color:none");
    }
  }
}

// // Hovering state:
// for (j = 0; j <= arrayShows.length; j++) {
//   let divElement = document.getElementsByClassName("show")[j];
//   let isHovered = false;

// }
