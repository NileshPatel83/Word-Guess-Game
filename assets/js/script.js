//Constants
const timeAllowed = 20;
const blankSpace = "_";
const monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Global variables.

//Keeps track of time remaning. This is to stop key press event after the remaining time is 0.
var timeRemaining = timeAllowed;

//Get elements from index file.
var startButton = document.getElementById("start-button");
var resetButton = document.getElementById("reset-button");
var monthName = document.getElementById("month-name");
var winCount = document.getElementById("wins");
var lossCount = document.getElementById("losses");
var timeLeft = document.getElementById("time-left");

//Event listener for start button.
startButton.addEventListener("click", function(){

    //Sets the initial value of allowed time.
    timeLeft.textContent = timeAllowed;

    // Starts the timer.
    // startTimer();

    //Gets the month name randomly.
    var monthName = monthsNames[Math.floor(Math.random() * monthsNames.length)];

    //Gets array of blank space position from month name.
    //Letter in month name will be replaced by blank at these positions.
    var blankSpacePosition = getBlankSpacePositions(monthName);

    var blankMonthName = getBlankMonthName(monthName, blankSpacePosition);
    // displayMessage(blankMonthName);
});

function getBlankMonthName(monthName, blankSpacePosition){

    
    



    return monthName;
}

//Gets array of blank space position from month name.
//Gets half blank spaces from month name as whole number.
//Letter in month name will be replaced by blank at these positions.
function getBlankSpacePositions(monthName){
    var blankSpacePositions = [];

    //Gets round down half of month length as whole number.
    //If month is "January" (total 7 letters, so half is 3.5), returns 3.
    var totalBlankSpaces = Math.floor(monthName.length/2);
    

    
    return blankSpacePositions;
}

//Starts the timer function.
function startTimer(){
    timeRemaining = timeAllowed;
    
    var timeInterval = setInterval(function () {
        timeRemaining--;

        //Sets the new time value.
        timeLeft.textContent = timeRemaining;

        //Stops the timer and displays message that game is over.
        if(timeRemaining === 0){
            clearInterval(timeInterval);

            //Displays specified message as month name.
            displayMessage("Game Over");
        }
      }, 1000);    
}

//Function to display specified message as month name.
function displayMessage(message){
    monthName.textContent = message;
}