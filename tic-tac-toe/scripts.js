// declare the board data for a game using 3 arrays

let rowA = ["-", "-", "-"];
let rowB = ["-", "-", "-"];
let rowC = ["-", "-", "-"];

// Tracks whose turn it is currently. Starts with "X".
let currentTurn = "X";

// Tracks the number of remaining turns. 
let remainingTurns = 9;

//  indicates if the game has ended (win or draw).
let gameOver = false;

// Variable to hold the DOM element displaying the current player.
let currentPlayer;


// Checks if three spaces have the same value (used for win detection).
// Returns true if all three values are identical, false otherwise.
function spaceMatch(spaceA, spaceB, spaceC) {
    return ((spaceA == spaceB) && (spaceA == spaceC));
}

// Evaluates the game board to determine if there's a winner or if it's a draw.


function checkGameboard(checkA, checkB, checkC) {
  let resultValue = "d"; // Default to draw, will be updated if a winner is found

  // Check all possible winning combinations: columns, rows, and diagonals

  // Check each column for three matching marks
  if (spaceMatch(checkA[0], checkB[0], checkC[0])) {
    if (checkA[0] != "-") resultValue = checkA[0]; // Winner found if not empty
  }

  if (spaceMatch(checkA[1], checkB[1], checkC[1])) {
    if (checkA[1] != "-") resultValue = checkA[1];
  }

  if (spaceMatch(checkA[2], checkB[2], checkC[2])) {
    if (checkA[2] != "-") resultValue = checkA[2];
  }

  // Check each row for three matching marks
  if (spaceMatch(checkA[0], checkA[1], checkA[2])) {
    if (checkA[0] != "-") resultValue = checkA[0];
  }

  if (spaceMatch(checkB[0], checkB[1], checkB[2])) {
    if (checkB[0] != "-") resultValue = checkB[0];
  }

  if (spaceMatch(checkC[0], checkC[1], checkC[2])) {
    if (checkC[0] != "-") resultValue = checkC[0];
  }

  // Check diagonals for three matching marks
  if (spaceMatch(checkA[0], checkB[1], checkC[2])) {
    if (checkA[0] != "-") resultValue = checkA[0];
  }

  if (spaceMatch(checkC[0], checkB[1], checkA[2])) {
    if (checkC[0] != "-") resultValue = checkC[0];
  }

  return resultValue; // Return the game outcome
}




// Event handler for when a game square is clicked.
// Handles placing marks, updating the board, checking for wins, and switching turns.
function clickSquare() {
  // Only proceed if the space is empty and the game isn't over
  if ((this.innerHTML == "") && !gameOver) {

    // Place the current player's mark in the clicked square
    this.innerHTML = currentTurn;

    // Add CSS class for styling
    this.classList.add(currentTurn.toLowerCase());

    // Decrease remaining turns counter
    remainingTurns--;
    console.log("Remaining turns: " + remainingTurns);

    // Update the corresponding array position based on the square's ID
    if (this.id=="a1") rowA[0] = currentTurn;
    if (this.id=="a2") rowA[1] = currentTurn;
    if (this.id=="a3") rowA[2] = currentTurn;
    if (this.id=="b1") rowB[0] = currentTurn;
    if (this.id=="b2") rowB[1] = currentTurn;
    if (this.id=="b3") rowB[2] = currentTurn;
    if (this.id=="c1") rowC[0] = currentTurn;
    if (this.id=="c2") rowC[1] = currentTurn;
    if (this.id=="c3") rowC[2] = currentTurn;

    // Log the current board state to console for debugging
    console.log("Rows");
    console.log(rowA);
    console.log(rowB);
    console.log(rowC);

    // Get reference to the game result display element
    let gameOutputMsg = document.querySelector("#gameResult");

    // Check for a winner or draw by evaluating the board
    let winState = checkGameboard(rowA, rowB, rowC);

    // Update the game result message based on the outcome
    if (winState == "X") { 
      // Style X in blue
      gameOutputMsg.innerHTML = "<span class='blue'>X</span> wins!";
      gameOver = true;
      
    } else if (winState == "O") {
      // Style O in red
      gameOutputMsg.innerHTML = "<span class='red'>O</span> wins!";
      gameOver = true;
    } else if  ((winState == "d") && (remainingTurns == 0)) {
      gameOutputMsg.innerHTML = "draw";
      gameOver = true;
    } else {
      gameOutputMsg.innerHTML = "unknown";
    }

    // Show the game result if the game has ended
    if (gameOver) {
        document.querySelector("#gameResult").style.display = "block";
    }

    // Switch to the other player's turn
    if (currentTurn == "X") currentTurn = "O";
    else currentTurn = "X";

    // Update the current player display
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
  currentPlayer = document.querySelector("#currentPlayer span");
  currentPlayer.innerHTML = currentTurn;
});






