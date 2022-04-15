var searchBtnEl = document.querySelector("#searchBtn");

var recipeInputEl = document.querySelector("#recipeInput");
var maxReadyTimeInputEl = document.querySelector("#maxReadyTimeInput");
var dietInputEl = document.querySelector("#dietInput");

var recipeInput;
var maxTimeInput;
var dietInupt;

var resultsEl = document.querySelector(".results-div");
var searchedEl = document.querySelector(".searched");
var resultCards = document.querySelector(".right-div");
var recipeModalEl = document.querySelector("#recipeModaldiv");
var recipeEl = document.querySelector("#recipeModal");
var bodyEl = document.querySelector("body");


var searchParam;



// on page load, we execute the getParams() function
var getParams = function() {
    //Get search params out of the URL
    //for now just one value
    searchParam = document.location.search.split("&"); 
    console.log(searchParam);
    //searchParams = [?q=pasta, maxreadytime=60, diet=vegan];
    recipeInput = searchParam[0].split("=").pop();
    console.log(recipeInput);

    addToSearchHistory();


    maxTimeInput = searchParam[1].split("=").pop();
    console.log(maxTimeInput);
    dietInput = searchParam[2].split("=").pop();
    console.log(dietInput);

    searchAPI();
};

var searchAPI = function() {

    var spoonacularKgAPI= "04508d6689fd404f88c686fe7d619d7d";
    var spoonacularScAPI= "d50e45466d7749c6b088e5e791b622e8";
    var spoonacularSkAPI= "2feecf75b18e4df9873c1f4dec8b24c4";

    var complexSearchAPIUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeInput}&diet=${dietInput}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&maxReadyTime=${maxTimeInput}&num=6&apiKey=${spoonacularKgAPI}`;

    fetch(complexSearchAPIUrl)
    .then(function(Response){
        return Response.json();
    })
    .then(function(data){
        console.log(data);

        for (var i=0;  i<10; i++) {
            var containerCard = document.createElement("div");
            containerCard.classList.add("grid-container");

            var gridx = document.createElement("div");
            // gridx.classList.add("grid-x", "grid-margin-x", "small-up-2", "medium-up-3");-dont use. 

            var cell= document.createElement("div");
            cell.classList.add("cell");

            var card= document.createElement("div");
            card.classList.add("card");

            var cardSection = document.createElement("div");
            cardSection.classList.add("card-section");



            var image = document.createElement("img");
            image.setAttribute("src", data.results[i].image);

            image.setAttribute(`data-open`, `recipeModal${i}`);
            // image.setAttribute("data-open", "recipeModal");
            // console.log(`recipeModal${i}`);
            image.classList.add("button");

            var modal = document.createElement("div");
            modal.classList.add("reveal");
            modal.setAttribute(`id`, `recipeModal${i}`);
            modal.setAttribute("data-reveal","");
          
            
            var readyTime = document.createElement("p");
            readyTime.innerHTML = "Maxium cook time: " + data.results[i].readyInMinutes + "min";
            console.log(data.results[i].readyInMinutes);

            var summary = document.createElement("p");
            summary.innerHTML = data.results[i].summary;
            console.log(data.results[i].summary);

            // var sourceUrlDiv = document.createElement("div");
            var sourceUrl = document.createElement("a")
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





            var recipeTile = document.createElement("h6");
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
            
            var techyPhrase = document.createElement('h1');
            techyPhrase.classList.add('techyText');

            techyPhrase.textContent = data.message;

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
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=269646d60e3a5ebc975b683c8ffa0dad&language=en-US&page="/7RcyjraM1cB1Uxy2W9ZWrab4KCw.jpg' + random )
    .then(response =>response.json())
    .then(data => {
        console.log(data)
        
             var movieTitle = document.createElement('h1') 
             var movieposter = document.createElement('img')
             var movieSummary = document.createElement('p')
            
             movieTitle.classList.add('movieText')
             movieSummary.classList.add('movieText')

             movieTitle.textContent = data.results[random].title
             moviePoster.setAttribute("src", data.results[random].poster_path)
             movieSummary.textContent = data.results[random].overview

             movieModal.append(data.results[random].title)
             movieSummary.append(data.results[random].poster_path)
             movieSummary.append(data.results[random].overview)
    })

}

movieButton.addEventListener('click', getMovieApi);


var searchedArr;
























var addToSearchHistory = function () {

    searchedArr = JSON.parse(localStorage.getItem("searched")) || []; //[chicken]
    console.log(searchedArr);
    
    searchedArr.push(recipeInput); //[chicken, beef]
    localStorage.setItem("searched", JSON.stringify(searchedArr));
    console.log(searchedArr);
    renderHistory();
}


var renderHistory = function() {

    // var searched = localStorage.getItem("searched");
    // console.log("searched:", searched);

    // searchedArr = JSON.parse(localStorage.getItem("searched")) || [];

    // searchedEl.innerHTML = "";

    for (var i=0; i < searchedArr.length; i++) {
        var searchedBlock = document.createElement("p");
        searchedBlock.textContent = searchedArr[i];
        searchedEl.appendChild(searchedBlock);
    }
    
};




// call funciton when page loads
getParams();
// addToSearchHistory();
// renderHistory();
// searchAPI();


searchBtnEl.addEventListener("click", function(){
    searchAPI();
});



searchBtnEl.addEventListener("click", function(){
    recipeInput = recipeInputEl.value.trim();
    maxTimeInput = maxReadyTimeInputEl.value.trim();
    dietInupt= dietInputEl.value.trim();

    if (!recipeInput || !maxTimeInput || !dietInupt) {
        console.error('You need a search input value!');
        return;
    }
   
    var querySting = `./searchResult.html?q=${recipeInput}&maxreadytime=${maxTimeInput}&diet=${dietInupt}`;
    location.assign(querySting);

    // getParams();
    // renderHistory();
})