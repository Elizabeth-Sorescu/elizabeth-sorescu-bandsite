// let shows = [
//   {
//     date: "Mon Sept 06 2021",
//     venue: "Ronald Lane",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Tue Sept 21 2021",
//     venue: "Pier 3 East",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Fri Oct 15 2021",
//     venue: "View Lounge",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Sat Nov 06 2021",
//     venue: "Hyatt Agency",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Fri Nov 26 2021",
//     venue: "Moscow Center",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Wed Dec 15 2021",
//     venue: "Press Club",
//     location: "San Francisco, CA",
//   },
// ];
// console.table(arrayShows);
// let ref = document.getElementById("bnd-footer");
// let newElem = ref.insertAdjacentHTML(
//   "beforebegin",
//   "<section class=shows></section>"
// );
// ref.insertAdjacentHTML("beforebegin", "<!-- FOOTER SECTION -->");

let commentsContainer = document.querySelector(".shows");
// let commentsContainer = document.querySelector(".shows");
// commentsContainer.insertAdjacentHTML(
//   "beforebegin",
//   "<!-- COMMENTS SECTION -->"
// );

let heroBackgroundImg = document.querySelector(".hero-img");

let songAlbum = document.createElement("p");
songAlbum.classList.add("hero-img__song-album");
heroBackgroundImg.appendChild(songAlbum);
songAlbum.innerText = "Moonlight Soul Album";

// let heading = document.createElement("h2");
// heading.classList.add("shows__heading");
// commentsContainer.appendChild(heading);
// heading.innerText = "Shows";

let divGroup = document.querySelector(".shows__group");
// let divGroup = document.createElement("ul");
// divGroup.classList.add("shows__group");
// commentsContainer.appendChild(divGroup);

// This generates a group of labels for large screens
// let grpLabels = document.createElement("div");
// grpLabels.classList.add("shows-group__labels");
// divGroup.appendChild(grpLabels);

// let dateLabel = document.createElement("label");
// dateLabel.classList.add("shows-group__label");
// grpLabels.appendChild(dateLabel);
// dateLabel.innerText = "DATE";

// let venueLabel = document.createElement("label");
// venueLabel.classList.add("shows-group__label");
// grpLabels.appendChild(venueLabel);
// venueLabel.innerText = "VENUE";

// let locationLabel = document.createElement("label");
// locationLabel.classList.add("shows-group__label");
// grpLabels.appendChild(locationLabel);
// locationLabel.innerText = "LOCATION";

// This function generates dynamic html on creating each show:
function generateShow(show, showRow) {
  let divSubGroup = document.createElement("li");
  divSubGroup.classList.add("show");
  showRow.appendChild(divSubGroup);

  // DATE
  let labelDateCaption = document.createElement("label");
  labelDateCaption.classList.add("show__main-label");
  labelDateCaption.classList.add("date");
  divSubGroup.appendChild(labelDateCaption);
  labelDateCaption.innerText = "DATE";

  let labelDateText = document.createElement("label");
  labelDateText.classList.add("show__main-value");
  labelDateText.classList.add("show__date-value");
  divSubGroup.appendChild(labelDateText);
  labelDateText.innerText = new Date(show.date).toDateString();
  // labelDateText.innerText = new Date(show.date).toLocaleDateString("en-US");

  // VENUE
  let labelVenueCaption = document.createElement("label");
  labelVenueCaption.classList.add("show__main-label");
  labelVenueCaption.classList.add("venue");
  divSubGroup.appendChild(labelVenueCaption);
  labelVenueCaption.innerText = "VENUE";

  let labelVenueText = document.createElement("label");
  labelVenueText.classList.add("show__main-value");
  divSubGroup.appendChild(labelVenueText);
  labelVenueText.innerText = show.place;

  // LOCATION
  let labelLocationCaption = document.createElement("label");
  labelLocationCaption.classList.add("show__main-label");
  labelLocationCaption.classList.add("location");
  divSubGroup.appendChild(labelLocationCaption);
  labelLocationCaption.innerText = "LOCATION";

  let labelLocationText = document.createElement("label");
  labelLocationText.classList.add("show__main-value");
  divSubGroup.appendChild(labelLocationText);
  labelLocationText.innerText = show.location;

  // BUTTON
  let btnDiv = document.createElement("div");
  btnDiv.classList.add("show__main-value");
  btnDiv.classList.add("buytcktbtn-value");
  btnDiv.classList.add("buy-tckt");
  divSubGroup.appendChild(btnDiv);

  let button = document.createElement("button");
  button.classList.add("buy-tckt__btn");
  btnDiv.appendChild(button);
  button.innerText = "buy tickets";
}

// This is the click event handler and highlights function when mouse is hovered on each show:
bandSiteApi.getShows().then((result) => {
  const shows = result;
  for (let show of shows) {
    generateShow(show, divGroup);
  }

  let items = [];
  for (let i = 0; i < shows.length; i++) {
    let divElements = document.getElementsByClassName("show");
    let divElement = divElements[i];
    divElement.id = i;
    items.push({ divElementId: divElement.id, divClicked: false });

    divElement.addEventListener("click", function () {
      items.find((obj) => {
        return obj.divElementId === this.id;
      }).divClicked = true;
      this.setAttribute("style", "background-color:yellow"); //#e1e1e1
      clearHighlights(Number(divElement.id));
    });

    divElement.addEventListener("mouseover", function () {
      if (
        items.find((obj) => {
          return obj.divElementId === this.id;
        }).divClicked
      ) {
        return;
      }

      if (divElement.hasAttribute("style", "background:none")) {
        this.setAttribute("style", "background:pink"); //#FAFAFA
      }
    });

    divElement.addEventListener("mouseleave", function () {
      if (
        items.find((obj) => {
          return obj.divElementId === this.id;
        }).divClicked === false
      ) {
        this.setAttribute("style", "background-color:none");
      }
    });
  }

  function clearHighlights(index) {
    for (let i = 0; i <= shows.length; i++) {
      let divElement = document.getElementsByClassName("show")[i];
      if (index !== i) {
        items.find((obj) => {
          return obj.divElementId === divElement.id;
        }).divClicked = false;
        divElement.setAttribute("style", "background-color:none");
      }
    }
  }
});
