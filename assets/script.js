let searchBtnEl = document.querySelector("#searchBtn");

let recipeInputEl = document.querySelector("#recipeInput");
let maxReadyTimeInputEl = document.querySelector("#maxReadyTimeInput");
let dietInputEl = document.querySelector("#dietInput");

let recipeInput;
let maxTimeInput;
let dietInupt;


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
})