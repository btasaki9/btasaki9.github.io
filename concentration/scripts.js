//javascript for concentration game for 1 player



//new function to flip card when clicked 
function flipCard() {

    //get all the clicked cards 
    let allClickedCards = document.quearySelectorAll(".clicked");

    //only proceeds if there are less than 2 clicked 
    if (allClickedCards.length < 2) {
        //add clicked clas to clicked card 
    this.classList.add("clicked");

    }

    //get a fresh list of clicked cards
    let allClickedCards = document.quearySelectorAll(".clicked");

    //if it's a pair compare them 
    if (allClickedCards.length == 2) {

        let card1 = allClickedCards[0].classList.toString();
        let card2 = allClickedCards[1].classList.toString();

        if (card1 == card2) {
            console.log("It's a match!");
        }else {
            console.log("Not a match!");
        }

    }
    
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