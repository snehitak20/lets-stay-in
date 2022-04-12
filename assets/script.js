let searchBtnEl = document.querySelector("#searchBtn");
let searchBarEl = document.querySelector("#searchBar");
let userInput;


searchBtnEl.addEventListener("click", function(){
    userInput = searchBarEl.value.trim();

    if (!userInput) {
        console.error('You need a search input value!');
        return;
    }
   
    location.assign("./searchResult.html");
})