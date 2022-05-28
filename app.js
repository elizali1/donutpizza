//default limit
let limit = 10;

var policeData;

var mainContainer;

const manhattan = document.getElementById('manhattan')
const brooklyn = document.getElementById('brooklyn')
const queens = document.getElementById('queens')
const statenIsland = document.getElementById('staten-island')
const bronx = document.getElementById('bronx')


function getData (event) {
    console.log(event.target.id)
  console.log(event)
  event.preventDefault();

  // user input needs to be stored somewhere
  let userInput = +document.getElementById("userInput").value;
  if (userInput === 0 ){
      userInput=limit;
  }
  console.log(userInput);
  mainContainer = document.getElementById("data");
  while (mainContainer.hasChildNodes()) {
    mainContainer.removeChild(mainContainer.firstChild);
  }

  // fetching data
  fetch(
    `https://data.cityofnewyork.us/resource/cwy2-px8b.json?agency=NYPD&borough=${event.target.id.toUpperCase()}&$limit=${userInput}`
  )
    .then((response) => response.json())
    .then((data) => (policeData = data))
    .then(() => {
      for (i = 0; i < policeData.length; i++) {
        var divOne = document.createElement("div");
        var divTwo = document.createElement("div");
        var divThree = document.createElement("div");

        divOne.innerHTML = `resolution description: ${policeData[i].resolution_description}`;
        divTwo.innerHTML =  `borough: ${policeData[i].borough}` ;
        divThree.innerHTML =  `descriptor: ${policeData[i].descriptor}`;
        mainContainer.appendChild(divOne);
        mainContainer.appendChild(divTwo);
        mainContainer.appendChild(divThree);

        const btn = document.getElementById("toggle");
    btn.onclick = function () {
      if (divOne.style.display !== "none") {
        divOne.style.display = "none";
      } else {
        divOne.style.display = "block";
      }
    };
      }
    })
    .catch((err) => console.log(err));
}

manhattan.addEventListener("click", getData)
brooklyn.addEventListener("click", getData)
queens.addEventListener("click", getData)
statenIsland.addEventListener("click", getData)
bronx.addEventListener("click", getData)