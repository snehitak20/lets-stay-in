let searchBtnEl = document.querySelector("#searchBtn");

let recipeInputEl = document.querySelector("#recipeInput");
let maxReadyTimeInputEl = document.querySelector("#maxReadyTimeInput");
let dietInputEl = document.querySelector("#dietInput");

let recipeInput;
let maxTimeInput;
let dietInupt;


let resultsEl = document.querySelector(".results-div");
let searchedEl = document.querySelector(".searched");
let resultCards = document.querySelector(".right-div");
let recipeModalEl = document.querySelector("#recipeModaldiv");
let recipeEl = document.querySelector("#recipeModal");
let bodyEl = document.querySelector("body");


let searchParam;



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

    let complexSearchAPIUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeInput}&diet=${dietInput}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&maxReadyTime=${maxTimeInput}&num=6&apiKey=${spoonacularSkAPI}`;

    fetch(complexSearchAPIUrl)
    .then(function(Response){
        return Response.json();
    })
    .then(function(data){
        console.log(data);

        for (let i=0;  i<4; i++) {
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

            image.setAttribute(`data-open`, `recipeModal${i}`);
            // image.setAttribute("data-open", "recipeModal");
            // console.log(`recipeModal${i}`);
            image.classList.add("button");

            let modal = document.createElement("div");
            modal.classList.add("reveal");
            modal.setAttribute(`id`, `recipeModal${i}`);
            modal.setAttribute("data-reveal","");
          
            
            let readyTime = document.createElement("p");
            readyTime.innerHTML = "Maxium cook time: " + data.results[i].readyInMinutes + "min";
            console.log(data.results[i].readyInMinutes);

            let summary = document.createElement("p");
            summary.innerHTML = data.results[i].summary;
            console.log(data.results[i].summary);

            // let sourceUrlDiv = document.createElement("div");
            let sourceUrl = document.createElement("a")
            sourceUrl.setAttribute("href", data.results[i].sourceUrl);
            sourceUrl.innerText = "***Full recipe click here***";
            // sourceUrlDiv.innerHTML(sourceUrl);
           
            console.log(data.results[i].sourceUrl);

            // image.addEventListener('click', function() {
            //     $(`recipeModal${i}`).foundation('reveal','open');
            //   });

            // recipeEl.appendChild(readyTime);
            // recipeEl.appendChild(summary);
            modal.appendChild(readyTime);
            modal.appendChild(summary);
            modal.appendChild(sourceUrl);
            recipeModalEl.appendChild(modal);
            
            // recipeCard.appendChild(sourceUrl);





            let recipeTile = document.createElement("h6");
            recipeTile.innerHTML = data.results[i].title;
            console.log(data.results[i].title);

            //append element to div
            cardSection.appendChild(recipeTile);
            cardSection.appendChild(image);
            // cardSection.appendChild(sourceUrl);


            card.appendChild(cardSection);

            cell.appendChild(card);

            gridx.appendChild(cell);

            containerCard.appendChild(gridx);

            resultCards.appendChild(containerCard);
        }
        $(document).foundation();
    });
};



var fetchButton = document.getElementById('techyBtn');
var techyModal = document.getElementById('techyModal');

function getApi() {

    console.log("click")
 
    fetch('https://techy-api.vercel.app/api/json')
    .then(response =>response.json())
    .then(data => {
        console.log(data)
            
            var techyPhrase = document.createElement('h1')
            techyPhrase.classList.add('techyText')
            techyPhrase.textContent = data.message

            techyModal.append(data.message)
    })

}

fetchButton.addEventListener('click', getApi);


var movieButton = document.getElementById('movieBtn');
var movieModal = document.getElementById('movieModal');

function getMovieApi() {

    console.log("click")
 function getRandomIntInclusive(min, max) {
            min = Math.ceil(1);
            max = Math.floor(20);
            return Math.floor(Math.random() * (max - min + 1) + min); 
          } console.log(getRandomIntInclusive())
          var random = getRandomIntInclusive()
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=269646d60e3a5ebc975b683c8ffa0dad&language=en-US&page=' + random )
    .then(response =>response.json())
    .then(data => {
        console.log(data)
        
             var movieTitle = document.createElement('h1')
             movieTitle.classList.add('movieText')
             movieTitle.textContent = data.results[random].title

             movieModal.append(data.results[random].title)
    })

}

movieButton.addEventListener('click', getMovieApi);


let searchedArr;

let renderHistory = function() {

    searchedArr = localStorage.getItem("searched") || [];

    for (let i=0; i < searchedArr.length; i++) {
        let searchedBlock = document.createElement("p");
        searchedBlock.textContent = searchedArr[i];
        searchedEl.appendChild(searchedBlock);
    }
};


let addToSearchHistory = function () {
    searchedArr.push(recipeInput);
    localStorage.setItem("searched", searchedArr);
}



// call funciton when page loads
getParams();
renderHistory();
// searchAPI();


searchBtnEl.addEventListener("click", function(){
    searchAPI();
});