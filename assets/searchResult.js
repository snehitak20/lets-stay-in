let searchParam;
let recipeInput;
let maxTimeInput;
let dietInput;

let resultsEl = document.querySelector(".results-div");

//on page load, we execute the getParams() function
let getParams = function() {
    //Get search params out of the URL
    //for now just one value
    searchParams = document.location.search.split("&"); 
    //searchParams = [?q=pasta, maxreadytime=60, diet=vegan];
    recipeInput = searchParams[0].split("=").pop();
    maxTimeInput = searchParams[1].split("=").pop();
    dietInput = searchParams[2].split("=").pop();

    searchAPI();
};

let searchAPI = function() {

    let spoonacularKgAPI= "04508d6689fd404f88c686fe7d619d7d";
    let spoonacularScAPI= "d50e45466d7749c6b088e5e791b622e8";
    let spoonacularSkAPI= "";

    let complexSearchAPIUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeInput}&diet=${dietInput}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&maxReadyTime=${maxTimeInput}&num=6&apiKey=${spoonacularKgAPI}`;


    fetch(complexSearchAPIUrl)
    .then(function(Response){
        return Response.json();
    })
    .then(function(data){
        console.log(data);

        for (let i=0;  i<7; i++) {
            let recipeCard = document.createElement("div");

            let recipeTile = document.createElement("h2");
            recipeTile.innerHTML = data.results[i].title;
            console.log(data.results[i].title);

            let image = document.createElement("img");
            image.setAttribute("href", data.results[i].image);

            let readyTime = document.createElement("p");
            readyTime.innerHTML = data.results[i].readyInMinutes;
            console.log(data.results[i].readyInMinutes);

            let summary = document.createElement("p");
            summary.innerHTML = data.results[i].summary;
            console.log(data.results[i].summary);

            let sourceUrl = document.createElement("a");
            sourceUrl.setAttribute("src", data.results[i].sourceUrl);
            console.log(data.results[i].sourceUrl);


            //append element to div
            recipeCard.appendChild(recipeTile);
            recipeCard.appendChild(image);
            recipeCard.appendChild(readyTime);
            recipeCard.appendChild(summary);
            recipeCard.appendChild(sourceUrl);

            //append recipeCard to results-div
            resultsEl.appendChild(recipeCard);
        

        }
    })

};
















// call funciton when page loads
getParams();