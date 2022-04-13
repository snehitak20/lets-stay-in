let resultsEl = document.querySelector(".results-div");
let searchedEl = document.querySelector(".searched");

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

        for (let i=0;  i<7; i++) {
            let recipeCard = document.createElement("div");

            let image = document.createElement("img");
            image.setAttribute("src", data.results[i].image);

            let recipeTile = document.createElement("h2");
            recipeTile.innerHTML = data.results[i].title;
            console.log(data.results[i].title);

            //append element to div
            recipeCard.appendChild(recipeTile);
            recipeCard.appendChild(image);

            //append recipeCard to results-div
            resultsEl.appendChild(recipeCard);
        }
    });
};

let renderHistory = function() {

    let oldData = JSON.parse(localStorage.getItem("searched")) || [];
    console.log(oldData);
    searchedEl.innerHTML = "";

    for (let i=0; i < oldData.length; i++) {
        let searchedBlock = document.createElement("p");
        searchedBlock.textContent = oldData[i];
        searchedEl.appendChild(searchedBlock);
    }

    console.log(recipeInput);
    oldData.push(recipeInput);
    localStorage.setItem("searched", oldData);
};









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
renderHistory();
// searchAPI();
