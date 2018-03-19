// GLOBAL VARIABLES

// These are the songs we will choose from for the game
var songList = ["master of puppets", "creeping death", "enter sandman", "one", "seek and destroy",  "for whom the bell tolls", "battery", "and justice for all", "fade to black", "welcome home"];

// This is the song that the computer will randomly select 
var selectedSong = "";

// This puts the song into letters which will be stored as an array
var lettersInselectedSong = [];

var numBlanks = 0;

var blanksAndsuccess = [];

var wrongGuesses = [];

var letterGuessed = "";

// Game counters that tell us the number of wins, losses and guesses
var winCounter = 0;
var lossCounter = 0; 
var numGuesses = 7;

// GLOBAL FUNCTIONS

// This function starts the game by specifying the number of guesses, randomly selecting a song from the array, determining the number of letters in the song and then logged the blanks and guesses.

function startGame () {

    numGuesses = 7;
    selectedSong = songList[Math.floor(Math.random() * songList.length)];
    lettersInselectedSong  = selectedSong.split("");
    numBlanks = lettersInselectedSong.length;
    console.log(selectedSong);
    blanksAndSuccesses = [];
    wrongGuesses = [];
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
      }
    console.log(blanksAndSuccesses);
    document.getElementById("guesses-left").innerHTML = numGuesses;
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// This function checks the letters for matches against the song

function checkLetters(letter) {
    var letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (selectedSong[i] === letter) {
            letterInWord = true;
    }
  }

    if (letterInWord) {
        for (var j = 0; j < numBlanks; j++) {
            if (selectedSong[j] === letter) {
                blanksAndSuccesses[j] = letter;
      }
    }
    console.log(blanksAndSuccesses);
  }
    else {
        wrongGuesses.push(letter);
        numGuesses--;
  }
}

// This function runs after each guess is made and udpates the HTML and alerts the user if they win or lose

function roundComplete() {
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);
    document.getElementById("guesses-left").innerHTML = numGuesses;
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
    if (lettersInselectedSong.toString() === blanksAndSuccesses.toString()) {
        winCounter++;
        alert("You win!");
        document.getElementById("win-counter").innerHTML = winCounter;
        startGame();
  }
    else if (numGuesses === 0) {
        lossCounter++;
        alert("You lose");
        document.getElementById("loss-counter").innerHTML = lossCounter;
        startGame();
    }
  }

// This is the main engine of the game which starts the game, documents which key was pressed, checks for a match and then ends the round.

startGame();
document.onkeyup = function(event) {
    letterGuessed = String.fromCharCode(event.which).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
};
