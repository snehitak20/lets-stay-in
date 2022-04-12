let searchParam;
let recipeInput;
let maxTimeInput;
let dietInput;

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

    let complexSearchAPIUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeInput}&maxReadyTime=${maxTimeInput}&diet=${dietInput}&num=6&apiKey=${spoonacularKgAPI}`;


    fetch(complexSearchAPIUrl)
    .then(function(Response){
        return Response.json();
    })
    .then(function(data){
        console.log(data);
    })

};
















// call funciton when page loads
getParams();