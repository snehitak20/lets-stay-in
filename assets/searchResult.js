// var recipesByIdUrl = `https://api.spoonacular.com/recipes/${id}/card`;


let ingredientsInput = "apple";
let spoonacularKgAPI= "04508d6689fd404f88c686fe7d619d7d";
let spoonacularScAPI= "d50e45466d7749c6b088e5e791b622e8";
let spoonacularSkAPI= "";
let searchByIngredientsUrl = `https://api.spoonacular.com/food/ingredients/search
?query=apples&number=6&apiKey=${spoonacularKgAPI}`;

fetch(searchByIngredientsUrl)
.then(function(Response){
    return Response.json();
})
.then(function(data){
    console.log(data);
})