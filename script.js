//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
 

  episodeList.forEach(element => {
    const headWrap = document.createElement('div');
    const wrap = document.createElement('div');
    const header = document.createElement('h3');
    const image = document.createElement('img');
    const aboutWrap = document.createElement('div');
    const about = document.createElement('p');
    const link = document.createElement('a');

        header.innerHTML = `${element.name} - S${String(element.season).padStart(2, '0')}E${String(element.number).padStart(2, '0')}`;
        image.src = element.image.medium;
        about.innerHTML = `${element.summary}`;

        aboutWrap.appendChild(about);
        about.appendChild(link);
        headWrap.appendChild(header);
        wrap.appendChild(headWrap);
        wrap.appendChild(image);
        wrap.appendChild(aboutWrap);
        rootElem.appendChild(wrap);

        //setting up the link 
        link.href = element.url;
        link.target = '_blank';
        link.innerHTML = `Episode Link`;

        //style

        //link

        link.style.color = "#87240E";

        //head

        header.style.color = 'black';

        //head wrapper

        headWrap.style.border = "1px solid black";
        headWrap.style.maxWidth = "100%";
        headWrap.style.borderRadius = '20px';
        headWrap.style.margin = "0 0 10px 0";
        headWrap.style.height = '80px';
        headWrap.style.backgroundColor = "#AEAEAE";

        //each div wrapper

        wrap.style.minWidth = "250px";
        wrap.style.maxWidth = '220px';
        wrap.style.minHeight = '30%';
        wrap.style.margin = "5px";
        wrap.style.textAlign = "center";
        wrap.style.border = "1px solid grey";
        wrap.style.borderRadius = '25px';

        wrap.style.flex = '1';
        wrap.style.backgroundColor = "lightgrey";
        
        //about wrapper

        aboutWrap.style.maxWidth = '100%';
        aboutWrap.style.textAlign = 'center';
        aboutWrap.style.margin = "20px 15px 30px 15px";
        
        //main style
        
        rootElem.style.display = 'flex';
        rootElem.style.flexFlow = 'row wrap';
        rootElem.style.marginLeft = "10px";

        //image style

        image.style.maxWidth = "100%";
        image.style.borderRadius = '10px';
  });

  //setting up footer and content of the footer

  const footer = document.createElement('footer');
  const footP = document.createElement('p');
  const footA = document.createElement('a');
  footer.setAttribute("id", "footer");
  footP.setAttribute("id", "footerP");
  footA.setAttribute("id", "footLink");
  rootElem.after(footer);
  footer.appendChild(footP);
  footA.href = "https://www.tvmaze.com/";
  footA.innerHTML = `https://www.tvmaze.com/`;

  //print content

  footP.innerHTML = `This content is from: ` + footA.outerHTML;
  
  
  



}

window.onload = setup;
