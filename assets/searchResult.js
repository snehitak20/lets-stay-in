let resultsEl = document.querySelector(".results-div");
let searchedEl = document.querySelector(".searched");
let resultCards = document.querySelector(".right-div")


let searchParam;
let recipeInput;
let maxTimeInput;
let dietInput;


// on page load, we execute the getParams() function
let getParams = function() {
    //Get search params out of the URL
    //for now just one value
    searchParam = document.location.search.split("&"); 
    console.log(searchParam);
    //searchParams = [?q=pasta, maxreadytime=60, diet=vegan];
    recipeInput = searchParam[0].split("=").pop();
    console.log(recipeInput);
    maxTimeInput = searchParam[1].split("=").pop();
    console.log(maxTimeInput);
    dietInput = searchParam[2].split("=").pop();
    console.log(dietInput);

    searchAPI();
};

let searchAPI = function() {

    let spoonacularKgAPI= "04508d6689fd404f88c686fe7d619d7d";
    let spoonacularScAPI= "d50e45466d7749c6b088e5e791b622e8";
    let spoonacularSkAPI= "2feecf75b18e4df9873c1f4dec8b24c4";

    let complexSearchAPIUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeInput}&diet=${dietInput}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&maxReadyTime=${maxTimeInput}&num=6&apiKey=${spoonacularKgAPI}`;

    fetch(complexSearchAPIUrl)
    .then(function(Response){
        return Response.json();
    })
    .then(function(data){
        console.log(data);

        for (let i=0;  i<6; i++) {
            let containerCard = document.createElement("div");
            containerCard.classList.add("grid-container");

            let gridx = document.createElement("div");
            // gridx.classList.add("grid-x", "grid-margin-x", "small-up-2", "medium-up-3");-dont use. 

            let cell= document.createElement("div");
            cell.classList.add("cell");

            let card= document.createElement("div");
            card.classList.add("card");

            let cardSection = document.createElement("div");
            cardSection.classList.add("card-section");

            let image = document.createElement("img");
            image.setAttribute("src", data.results[i].image);

            let recipeTile = document.createElement("h6");
            recipeTile.innerHTML = data.results[i].title;
            console.log(data.results[i].title);

            //append element to div
            cardSection.appendChild(recipeTile);
            cardSection.appendChild(image);

            card.appendChild(cardSection);

            cell.appendChild(card);

            gridx.appendChild(cell);

            containerCard.appendChild(gridx);

            resultCards.appendChild(containerCard);
        }
    });
};



var fetchButton = document.getElementById('techyModal');
var techyModal = document.getElementById('techyModal');

function getApi() {

    console.log("click")
 
    fetch('https://techy-api.vercel.app/api/json')
    .then(response =>response.json())
    .then(data => {
        console.log(data)
    

            var techyPhrase = document.createElement('h1')
            techyPhrase.textContent = data.message

            techyModal.append(data.message)
    })

}

fetchButton.addEventListener('click', getApi);



// let renderHistory = function() {

//  let oldData = JSON.parse(localStorage.getItem("searched")) || [];
//     console.log(oldData);
//     searchedEl.innerHTML = "";

//     for (let i=0; i < oldData.length; i++) {
//         let searchedBlock = document.createElement("p");
//         searchedBlock.textContent = oldData[i];
//         searchedEl.appendChild(searchedBlock);
//     }

//     console.log(recipeInput);
//     oldData.push(recipeInput);
//     localStorage.setItem("searched", oldData);
// };




// DO NOT DELETE :)
// let readyTime = document.createElement("p");
// readyTime.innerHTML = data.results[i].readyInMinutes;
// console.log(data.results[i].readyInMinutes);

// let summary = document.createElement("p");
// summary.innerHTML = data.results[i].summary;
// console.log(data.results[i].summary);

// let sourceUrl = document.createElement("a");
// sourceUrl.setAttribute("src", data.results[i].sourceUrl);
// console.log(data.results[i].sourceUrl);



// recipeCard.appendChild(readyTime);
// recipeCard.appendChild(summary);
// recipeCard.appendChild(sourceUrl);
















// call funciton when page loads
getParams();
// renderHistory();
// searchAPI();
