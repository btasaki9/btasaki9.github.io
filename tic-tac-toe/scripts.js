// declare the board data for a game, using 3 arrays
// "-" indicates unmarked, "x" indicates an X mark, "o" indicates an O mark
let rowA = ["-", "-", "-"];
let rowB = ["-", "-", "-"];
let rowC = ["-", "-", "-"];

//track who's turns 
let currentTurn = "X";

//track number of turns
let remainingTurns = 9;

//track if game is over 
let gameOver = false;


//set up blank variable for current DOM player element
//let currentPlayer;


// return Boolean true if all 3 submitted values match, otherwise return false
function spaceMatch(spaceA, spaceB, spaceC) {
    return ((spaceA == spaceB) && (spaceA == spaceC));
}

function checkGameboard(checkA, checkB, checkC) {
  let resultValue = "d"; //assume the game is a draw

  //an if else set of conditional statements, or some loops, or something 
  //to compare the data



  // check column 0
  if (spaceMatch(checkA[0], checkB[0], checkC[0])) {
    if (checkA[0] != "-") resultValue = checkA[0]; // set outcome to winner if not "-"
  }

  // check column 1
  if (spaceMatch(checkA[1], checkB[1], checkC[1])) {
    if (checkA[1] != "-") resultValue = checkA[1]; // set outcome to winner if not "-"
  }

  // check column 2
  if (spaceMatch(checkA[2], checkB[2], checkC[2])) {
    if (checkA[2] != "-") resultValue = checkA[2]; // set outcome to winner if not "-"
  }

  // check row A
  if (spaceMatch(checkA[0], checkA[1], checkA[2])) {
    if (checkA[0] != "-") resultValue = checkA[0]; // set outcome to winner if not "-"
  }

  // check row B
  if (spaceMatch(checkB[0], checkB[1], checkB[2])) {
    if (checkB[0] != "-") resultValue = checkB[0]; // set outcome to winner if not "-"
  }

  // check row C
  if (spaceMatch(checkC[0], checkC[1], checkC[2])) {
    if (checkC[0] != "-") resultValue = checkC[0]; // set outcome to winner if not "-"
  }

  // check diagonal from top left
  if (spaceMatch(checkA[0], checkB[1], checkC[2])) {
    if (checkA[0] != "-") resultValue = checkA[0]; // set outcome to winner if not "-"
  }

  // check diagonal from bottom left
  if (spaceMatch(checkC[0], checkB[1], checkA[2])) {
    if (checkC[0] != "-") resultValue = checkC[0]; // set outcome to winner if not "-"
  }

  return resultValue; // return the final outcome
}




//function for clicks 
function clickSquare() {
  //proceeds if space is as empty
  if ((this.innerHTML == "") && !gameOver) {

    //set space
    this.innerHTML = currentTurn;

    //add class for styling
    this.classList.add(currentTurn.toLowerCase());

    //subtract one from remaining turns
    remainingTurns--;
    console.log("Remaining turns: " + remainingTurns);

    //update the array of rows with the player value 
    if (this.id=="a1") rowA[0] = currentTurn;
    if (this.id=="a2") rowA[1] = currentTurn;
    if (this.id=="a3") rowA[2] = currentTurn;
    if (this.id=="b1") rowB[0] = currentTurn;
    if (this.id=="b2") rowB[1] = currentTurn;
    if (this.id=="b3") rowB[2] = currentTurn;
    if (this.id=="c1") rowC[0] = currentTurn;
    if (this.id=="c2") rowC[1] = currentTurn;
    if (this.id=="c3") rowC[2] = currentTurn;

    //output arays to console
    console.log("Rows");
    console.log(rowA);
    console.log(rowB);
    console.log(rowC);

    // get a handle on the DOM element to be updated with the outcome
let gameOutputMsg = document.querySelector("#gameResult");


// call your function checkGameboard() with the 3 rows
let winState = checkGameboard(rowA, rowB, rowC);

// test the returned value of the function
if (winState == "X") { 
  // wrap the x in a span for blue styling
  gameOutputMsg.innerHTML = "<span class='blue'>X</span> wins!";
  gameOver = true;
  
} else if (winState == "O") {
  // wrap the O in a span for red styling
  gameOutputMsg.innerHTML = "<span class='red'>O</span> wins!";
  gameOver = true;
} else if  ((winState == "d") && (remainingTurns == 0)) {
  gameOutputMsg.innerHTML = "draw";
  gameOver = true;
} else {
  gameOutputMsg.innerHTML = "unknown";
}

// reveal game outcome if game is over
        if (gameOver) {
            document.querySelector("#gameResult").style.display = "block";
        }


    //flips turn back and forth 
    if (currentTurn == "X") currentTurn = "O";
    else currentTurn = "X";


    //update next player DOM element
    currentPlayer.innerHTML = currentTurn;
  }

}


//wait for the DOM to load before running the code that updates the page
document.addEventListener("DOMContentLoaded", function () {
  //find all clickable spaces 
  let allSpaces = document.querySelectorAll(".gameSpace");

  // loop with "for-all" through all the clickable spaces
  for (let eachSpace of allSpaces) {
    eachSpace.addEventListener("click", clickSquare);
  }

//updates current player DOM element with first player
  let currentPlayer= document.querySelector("#currentPlayer span");
  currentPlayer.innerHTML = currentTurn;
});






