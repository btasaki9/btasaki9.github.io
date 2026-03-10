// declare the board data for a game, using 3 arrays
// "-" indicates unmarked, "x" indicates an X mark, "o" indicates an O mark
let rowA = [ "-", "-", "-" ];
let rowB = [ "-", "-", "-" ];
let rowC = [ "-", "-", "-" ];

//track turns 
let currentTurn = "x";



function checkGameboard(checkA,checkB,checkC) {
  let resultValue = "d"; //assume the game is a draw
  
  //an if else set of conditional statements, or some loops, or something 
  //to compare the data
  
  
 
    // check column 0
    if (spaceMatch(a[0], b[0], c[0])) {
        if (a[0] != "-") outcome = a[0]; // set outcome to winner if not "-"
    }

    // check column 1
    if (spaceMatch(a[1], b[1], c[1])) {
        if (a[1] != "-") outcome = a[1]; // set outcome to winner if not "-"
    }

    // check column 2
    if (spaceMatch(a[2], b[2], c[2])) {
        if (a[2] != "-") outcome = a[2]; // set outcome to winner if not "-"
    }

    // check row A
    if (spaceMatch(a[0], a[1], a[2])) {
        if (a[0] != "-") outcome = a[0]; // set outcome to winner if not "-"
    }

    // check row B
    if (spaceMatch(b[0], b[1], b[2])) {
        if (b[0] != "-") outcome = b[0]; // set outcome to winner if not "-"
    }

    // check row C
    if (spaceMatch(c[0], c[1], c[2])) {
        if (c[0] != "-") outcome = c[0]; // set outcome to winner if not "-"
    }

    // check diagonal from top left
    if (spaceMatch(a[0], b[1], c[2])) {
        if (a[0] != "-") outcome = a[0]; // set outcome to winner if not "-"
    }

    // check diagonal from bottom left
    if (spaceMatch(c[0], b[1], a[2])) {
        if (c[0] != "-") outcome = c[0]; // set outcome to winner if not "-"
    }

    return outcome; // return the final outcome
}

    

 


//function for clicks 
function clickSquare() {
  //set space
    this.innerHTML = currentTurn;
    //flips turn back and forth 
    if (currentTurn == "x") currentTurn = "o";
    else currentTurn = "x";
}


//wait for the DOM to load before running the code that updates the page
document.addEventListener("DOMContentLoaded", function() {
    //find all clickable spaces 
    let allSpaces = document.querySelectorAll(".gamespace");

    // loop with "for-all" through all the clickable spaces
    for (let eachSpace of allSpaces) {
        eachSpace.addEventListener("click", clickSquare);
    }
});




// **********************************************
// ***** DO NOT EDIT THE CODE BELOW THIS LINE
// **********************************************

/*
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
/*