//javascript for concentration game for 1 player



//new function to flip card when clicked 
function flipCard() {
    this.classlist.add("clicked");
}






//runs the code when the dom is loaded
document.addEventListener("DOMContentLoaded", function(e) {

    //get handles to game elements 
    let allCards = document.querySelectorAll(".card");
    let gameBoard = document.querySelector("#gameboard");

    //randomize cards by looping through the cards 
    for (let x = 0; x < allCards.length; x++) {    
        let randnum = Math.floor(Math.random() * allCards.length);
        gameboard.insertBefore( allCards[x], gameboard.children [randnum]);
    }

    allCards[x].addEventListener("click", flipCard);
   });