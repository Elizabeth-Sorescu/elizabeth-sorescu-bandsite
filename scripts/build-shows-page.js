let heroBackgroundImg = document.querySelector(".hero-img");

let songAlbum = document.createElement("p");
songAlbum.classList.add("hero-img__song-album");
heroBackgroundImg.appendChild(songAlbum);
songAlbum.innerText = "Moonlight Soul Album";

let divGroup = document.querySelector(".shows__group");

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
      this.setAttribute("style", "background-color:#e1e1e1");
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
        this.setAttribute("style", "background:#FAFAFA");
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
