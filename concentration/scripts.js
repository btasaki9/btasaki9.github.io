//javascript for concentration game for 1 player

//track number of turns
let playerClicks = 0;

//clear clicked classes
function clearClicks() {
    let allClickedCards = document.querySelectorAll(".clicked");
    for (let eachCard of allClickedCards) {
        eachCard.classList.remove("clicked");
    }

    //increase player turn count by 1 
    playerClicks++;
    document.querySelector("#turnCount span").innerHTML = playerClicks;   
}

//new function to flip card when clicked 
function flipCard() {

    if (!this.classList.contains("matched")) {



        //get all the clicked cards 
        let allClickedCards = document.querySelectorAll(".clicked");

        //only proceeds if there are less than 2 clicked 
        if (allClickedCards.length < 2) {
            //add clicked class to clicked card 
            this.classList.add("clicked");
        }

        //get a fresh list of clicked cards
        allClickedCards = document.querySelectorAll(".clicked");

        //if it's a pair compare them 
        if (allClickedCards.length == 2) {

            //get the class list of each card as a string 
            let card1 = allClickedCards[0].classList.toString();
            let card2 = allClickedCards[1].classList.toString();

            //if the class lists match it's a pair
            if (card1 == card2) {
                console.log("It's a match!");
                allClickedCards[0].classList.add("matched");
                allClickedCards[1].classList.add("matched");
                window.setTimeout(clearClicks, 2000);
            }
            else {
                console.log("Not a match!");
                window.setTimeout(clearClicks, 2000);
            }

        }
    }

}






//runs the code when the dom is loaded
document.addEventListener("DOMContentLoaded", function (e) {

    //get handles to game elements 
    let allCards = document.querySelectorAll(".card");
    let gameBoard = document.querySelector("#gameboard");

    //randomize cards by looping through the cards 
    for (let x = 0; x < allCards.length; x++) {

        let randNum = Math.floor(Math.random() * allCards.length);
        gameBoard.insertBefore(allCards[x], gameBoard.children[randNum]);

        allCards[x].addEventListener("click", flipCard);

    }

});