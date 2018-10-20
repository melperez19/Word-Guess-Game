//Variables made for game 
var bands = ["tlc", "backstreetboys", "oasis", "foofighters", "spicegirls", "hanson", "britneyspears",
    "nsync", "nirvana", "nodoubt"];
const maxTries = 8;
var currentWord; //Index word picked at random from bands array
var guessingWord = []; //Word built by user to match the current word selected
var guessedLetters = [];
var numGuessesLeft = 10;
var numWins = 0;
var numLosses = 0;
var gameFinished = false; //Will flag for "press any key to get started"
var gameStarted = false; //Will tell the program if the game has started


//Reset Game function to reset all statistics and pick a new word
//All game information as reset
function resetGame() {
    numGuessesLeft = maxTries;
    gameStarted = false;
    //Program will pick a word from bands array at random for the user to guess
    currentWord = bands[Math.floor(Math.random() *bands.length)];
    guessedLetters = [];
    numGuessesLeft= 10;
    guessingWord = [];
    numWins = 0;
    numLosses = 0;
    //Build the correct word being guessed and then clear it out
    for (var i = 0; i < currentWord.length; i++) {
        guessingWord.push('_');
        
        
    }
    //Hide end of game images/mathching band pic with band name
    //document.getElementById("").style.cssText = "display: none";

    //Show the display
    updateDisplay();
};


//updateDisplay funtion will allow all updates to appear in real time
function updateDisplay() {
    document.getElementById("wins").innerText = numWins;
    document.getElementById("losses").innerText = numLosses;
    document.getElementById("current-word").innerText = guessingWord.join(" ");
    document.getElementById("guesses-remaining").innerText = numGuessesLeft;
    document.getElementById("letters-guessed").innerText = guessedLetters;
    if (numGuessesLeft <= 0) {
        //document.getElementById("gameover-image").style.cssText = "display: block";
        // document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        gameFinished = true;
    }
}
//Program will reset the game and recognize key letters pressed between A-Z
document.onkeyup = function (event) {
    if (gameFinished) {
        resetGame();
        gameFinished = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
            
        }
        
    }
}

function makeGuess(letter) {
    if (numGuessesLeft > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // Make sure the letter hasn't been used yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
};

// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter and store in an array.
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
            positions.push(i);
        }
    }
    // Loop through all the matching keys pressed and replace the '_' with a letter.
    for (var i = 0; i < positions.length; i++) {
        guessingWord[positions[i]] = letter;
    
    }
}

function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        //document.getElementById("").style.cssText = "display: block";
        wins++;
        gameFinished = true;
    }
};






