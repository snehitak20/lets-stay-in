// var recipesByIdUrl = `https://api.spoonacular.com/recipes/${id}/card`;


let ingredientsInput = "apple";
let searchByIngredientsUrl = `https://api.spoonacular.com/food/ingredients/search
?query=apples&number=6`;

fetch(searchByIngredientsUrl)
.then(function(Response){
    return Response.json();
})
.then(function(data){
    console.log(data);
})