//You can edit ALL of the code here
const bodyTag = document.getElementsByTagName("body");
const header = document.getElementById("header");
const search = document.getElementById("search");
const rootElem = document.getElementById("root");
const select = document.getElementById("series");
const select1 = document.getElementById("shows");
let searchTerm = "";
let listSearch = "";
let listSearch1 = 167;

search.style.margin = "0px 15px 0px 15px";
search.style.fontSize = "20px";

var getAllEpisodes2;

var url = "https://api.tvmaze.com/shows/167/episodes";
function setupAllShows() {
  const allShows = getAllShows();
  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  allShows.sort(compare).forEach((e) => {
    var option = document.createElement("option");
    option.value = e.id;
    option.text = e.name;
    shows.appendChild(option);
  });
  shows.addEventListener("change", showSelectHandler);

  showSelectHandler({ target: { value: allShows[0].id } });
}

const showSelectHandler = (e) => {
  //saving pick
  listSearch1 = e.target.value;
  searchTerm = "";
  listSearch = "";
  series.value = "";
  search.value = "";
  //console.log(listSearch1);
  url = "https://api.tvmaze.com/shows/" + listSearch1 + "/episodes";

  //console.log(listSearch1);
  grab(url);
};

async function grab(url) {
  //console.log(url);
  const response = await fetch(url);
  if (response.status === 200) {
    var data = await response.json();
  } else {
    throw new Error(response.status);
  }
  const result = await data;
  setup(result);
}

function setup(getAllEpisodes2) {
  const allEpisodes = getAllEpisodes2;
  //console.log(allEpisodes);
  episodeSelect(allEpisodes);

  //search setting
  search.addEventListener("input", (e) => {
    // saving the input value
    searchTerm = e.target.value;
    listSearch = "";
    series.value = "";

    // re-displaying episodes based on the search
    makePageForEpisodes(allEpisodes);
  });

  function episodeSelect(allEpisodes) {
    series.innerHTML = "";
    var option = document.createElement("option");
    option.value = "";
    option.selected = "selected";
    option.text = "ALL SERIES";
    listSearch = "";
    series.appendChild(option);

    allEpisodes.forEach((e) => {
      var option = document.createElement("option");
      option.value = String(e.id);
      option.text = `S${String(e.season).padStart(2, "0")}E${String(
        e.number
      ).padStart(2, "0")} - ${e.name} `;
      series.appendChild(option);
    });
  }

  series.addEventListener("change", (e) => {
    //saving pick
    listSearch = e.target.value;
    searchTerm = "";
    search.value = "";
    //console.log(listSearch);

    //display pick
    makePageForEpisodes(allEpisodes);
  });

  makePageForEpisodes(allEpisodes);

  function makePageForEpisodes(episodeList) {
    //reset counter
    //console.log(episodeList);
    var count = 0;

    //reset the list
    rootElem.innerHTML = "";

    var counter = document.getElementById("counter");
    const counterWrap = document.createElement("div");
    counterWrap.setAttribute("id", "counterWrap");

    header.style.backgroundColor = "grey";
    header.style.maxHeight = "40px";
    const ul = document.createElement("ul");

    episodeList
      .filter((item) => {
        return (
          String(item.id).includes(listSearch) &&
          (item.name.toLowerCase().includes(searchTerm) ||
            item.summary.toLowerCase().includes(searchTerm))
        );
      })
      .forEach((element) => {
        count++;

        const wrap = document.createElement("li");
        const headWrap = document.createElement("div");
        const heading = document.createElement("h3");
        const image = document.createElement("img");
        const aboutWrap = document.createElement("div");
        const about = document.createElement("p");
        const link = document.createElement("a");
        const sum = document.createElement("h4");
        about.className = "summ";

        heading.innerHTML = `${element.name} - S${String(
          element.season
        ).padStart(2, "0")}E${String(element.number).padStart(2, "0")}`;

        // dealing with no image
        if (element.image && element.image.medium) {
          image.src = `${element.image.medium}`;
        } else {
          image.src = `images/No-Image-Placeholder128.png`;
        }

        // dealing with no summary
        if (!element.summary) {
          element.summary = `<p>No Summary.</p>`;
        }

        sum.innerHTML = `Summary`;

        about.innerHTML = element.summary;

        aboutWrap.appendChild(sum);
        aboutWrap.appendChild(about);
        aboutWrap.appendChild(link);
        headWrap.appendChild(heading);
        wrap.appendChild(headWrap);
        wrap.appendChild(image);
        wrap.appendChild(aboutWrap);
        ul.appendChild(wrap);
        header.appendChild(counter);
        header.appendChild(counterWrap);
        counterWrap.appendChild(counter);

        //setting up the link
        link.href = element.url;
        link.target = "_blank";
        link.innerHTML = `Episode Link`;

        //style
        //head
        heading.style.color = "black";

        //head wrapper
        headWrap.style.border = "1px solid black";
        headWrap.style.maxWidth = "100%";
        headWrap.style.borderRadius = "20px";
        headWrap.style.margin = "0 0 10px 0";
        headWrap.style.height = "80px";
        headWrap.style.backgroundColor = "#AEAEAE";

        //each div wrapper
        wrap.style.listStyleType = "none";
        wrap.style.minWidth = "250px";
        wrap.style.maxWidth = "220px";
        wrap.style.minHeight = "30%";
        wrap.style.margin = "5px";
        wrap.style.textAlign = "center";
        wrap.style.border = "1px solid grey";
        wrap.style.borderRadius = "25px";
        wrap.style.flex = "1";
        wrap.style.backgroundColor = "lightgrey";

        //about wrapper
        aboutWrap.style.maxWidth = "100%";
        aboutWrap.style.textAlign = "center";
        aboutWrap.style.margin = "20px 15px 30px 15px";

        //main style
        ul.style.display = "flex";
        ul.style.flexFlow = "row wrap";
        ul.style.marginLeft = "10px";

        //image style
        image.style.maxWidth = "100%";
        image.style.borderRadius = "10px";

        //counter filter style
        counter.style.color = "white";
      });

    //counter p style
    counter.style.fontSize = "18px";
    counter.style.textAlign = "center";
    counter.style.lineHeight = "40px";
    counter.style.margin = "auto";
    counter.innerHTML = `filtered ${count} / ${episodeList.length} total`;

    counterWrap.style.display = "flex";
    counterWrap.style.display = "row wrap";
    //append to the main div
    rootElem.appendChild(ul);

    //header style
    header.style.display = "flex";
    header.style.flexWrap = "wrap";
    header.style.textAlign = "center";

    //search input style
    search.style.display = "flex";
    search.style.flexWrap = "wrap";
    search.style.maxWidth = "150px";
    search.style.height = "35px";
  }
}

const footer = document.getElementById("footer");
const footP = document.createElement("p");
const footA = document.createElement("a");
//footer.setAttribute("id", "footer");
footP.setAttribute("id", "footerP");
footA.setAttribute("id", "footLink");
rootElem.after(footer);
footer.appendChild(footP);
footA.href = "https://www.tvmaze.com/";
footA.innerHTML = `https://www.tvmaze.com/`;
footA.target = "_blank";

//print content
footP.innerHTML = `This content is from: ` + footA.outerHTML;

window.onload = setupAllShows;
