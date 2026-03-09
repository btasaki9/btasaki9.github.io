// declare the board data for a game, using 3 arrays
// "-" indicates unmarked, "x" indicates an X mark, "o" indicates an O mark
let rowA = [ "-", "-", "-" ];
let rowB = [ "-", "-", "-" ];
let rowC = [ "-", "-", "-" ];




function checkGameboard(checkA,checkB,checkC) {
  let resultValue = "d"; //assume the game is a draw
  
  //an if else set of conditional statements, or some loops, or something 
  //to compare the data
  
  
 //rows
  if ( ( checkA[0] == checkA[1] ) && ( checkA[0] == checkA[2] ) ) {
    if (checkA[0] == "x") resultValue = "x";
    else if (checkA[0] == "o") resultValue = "o";
    
  }
  
    if ( ( checkB[0] == checkB[1] ) && ( checkB[0] == checkB[2] ) ) {
    if (checkB[0] == "x") resultValue = "x";
    else if (checkB[0] == "o") resultValue = "o";
    
  }
  
    if ( ( checkC[0] == checkC[1] ) && ( checkC[0] == checkC[2] ) ) {
    if (checkC[0] == "x") resultValue = "x";
    else if (checkC[0] == "o") resultValue = "o";
    
  }
  
  //columbs 
    if ( ( checkA[0] == checkB[0] ) && ( checkB[0] == checkC[0] ) ) {
    if (checkA[0] == "x") resultValue = "x";
    else if (checkB[0] == "x") resultValue = "x";
    else if (checkC[0] == "x") resultValue = "x";
    else if (checkA[0] == "o") resultValue = "o";
    else if (checkB[0] == "o") resultValue = "o";
    else if (checkC[0] == "o") resultValue = "o";
    
  }
  
    if ( ( checkA[1] == checkB[1] ) && ( checkB[1] == checkC[1] ) ) {
    if (checkA[1] == "x") resultValue = "x";
    else if (checkB[1] == "x") resultValue = "x";
    else if (checkC[1] == "x") resultValue = "x";
    else if (checkA[1] == "o") resultValue = "o";
    else if (checkB[1] == "o") resultValue = "o";
    else if (checkC[1] == "o") resultValue = "o";
    
  }
  
   if ( ( checkA[2] == checkB[2] ) && ( checkB[2] == checkC[2] ) ) {
    if (checkA[2] == "x") resultValue = "x";
    else if (checkB[2] == "x") resultValue = "x";
    else if (checkC[2] == "x") resultValue = "x";
    else if (checkA[2] == "o") resultValue = "o";
    else if (checkB[2] == "o") resultValue = "o";
    else if (checkC[2] == "o") resultValue = "o";
   }
  
  //diagnal
  
 if ( ( checkA[0] == checkB[1] ) && ( checkB[1] == checkC[2] ) ) {
    if (checkA[0] == "x") resultValue = "x";
    else if (checkB[1] == "x") resultValue = "x";
    else if (checkC[2] == "x") resultValue = "x";
    else if (checkA[0] == "o") resultValue = "o";
    else if (checkB[1] == "o") resultValue = "o";
    else if (checkC[2] == "o") resultValue = "o";
 }
  
if ( ( checkA[2] == checkB[1] ) && ( checkB[1] == checkC[0] ) ) {
    if (checkA[2] == "x") resultValue = "x";
    else if (checkB[1] == "x") resultValue = "x";
    else if (checkC[0] == "x") resultValue = "x";
    else if (checkA[2] == "o") resultValue = "o";
    else if (checkB[1] == "o") resultValue = "o";
    else if (checkC[0] == "o") resultValue = "o";
 }
  
  return resultValue;
}






// **********************************************
// ***** DO NOT EDIT THE CODE BELOW THIS LINE
// **********************************************


// get a handle on the DOM element to be updated with the outcome
let gameOutputMsg = document.querySelector("#gameResult span");


// call your function checkGameboard() with the 3 rows
let winState = checkGameboard(rowA, rowB, rowC);

// test the returned value of the function
if (winState == "x") { 
  gameOutputMsg.innerHTML = "X wins";
  
} else if (winState == "o") {
  gameOutputMsg.innerHTML = "O wins";
  
} else if (winState == "d") {
  gameOutputMsg.innerHTML = "draw";
  
} else {
  gameOutputMsg.innerHTML = "unknown";
}
