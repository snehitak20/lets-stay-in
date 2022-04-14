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

    if (!recipeInput) {
        console.error('You need a search input value!');
        recipeInputEl.classList.add('animate__animated', 'animate__flash');
        recipeInput.style.setProperty('--animate-duration', '0.5s');
        return;

    } else if (!maxTimeInput) {
        console.error('You need a search input value!');
        maxReadyTimeInputEl.classList.add('animate__animated', 'animate__flash');
        maxReadyTimeInputEl.style.setProperty('--animate-duration', '0.5s');
        return;

    } else if (!dietInput) {
        console.error('You need a search input value!');
        dietInputEl.classList.add('animate__animated', 'animate__flash');
        dietInputEl.style.setProperty('--animate-duration', '0.5s');
        return;
    }
        
   
    var querySting = `./searchResult.html?q=${recipeInput}&maxreadytime=${maxTimeInput}&diet=${dietInupt}`;
    location.assign(querySting);
})