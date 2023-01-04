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
    var blankSpacePositionArray = getBlankSpacePositionArray(monthName);

    //Gets blank month name by replacing letters at blank space position array with underscore.
    var blankMonthName = getBlankMonthName(monthName, blankSpacePositionArray);

    //Displays the value of blank month name.
    displayMessage(blankMonthName.join(""));
});

//Gets blank month name by replacing letters at blank space position array with underscore.
function getBlankMonthName(monthName, blankSpacePositionArray){

    var blankMonthName = [];

    //Converts the month name into an array of letters.
    var monthNameLetters = monthName.split("");

    //Loops through month name letters.
    for(var i = 0; i < monthNameLetters.length; i++){

        //If the blank space array includes the current position, replaces the letter with underscore.
        if(blankSpacePositionArray.includes(i)){
            blankMonthName.push(blankSpace)
        }

        //Otherwise gets the letter from month name for current position.
        else{
            blankMonthName.push(monthNameLetters[i])
        }
    }
    
    return blankMonthName;
}

//Gets array of blank space position from month name.
//Gets half blank spaces from month name as whole number.
//Letter in month name will be replaced by blank at these positions.
function getBlankSpacePositionArray(monthName){
    var blankSpacePositionArray = [];

    //Gets round down half of month length as whole number.
    //If month is "January" (total 7 letters, so half is 3.5), returns 3.
    var totalBlankSpaces = Math.floor(monthName.length/2);
    
    //For loop to get blank positions.
    for(var i = 0; i < totalBlankSpaces; i++){

        //Gets the blank position.
        var position = Math.floor(Math.random() * monthName.length);

        //Checks whether this position is already added to the array or not.
        //If added already then repeats the step.
        if(blankSpacePositionArray.includes(position)){
            i--;
        }

        //Otherwise adds the position to an array.
        else{
            blankSpacePositionArray.push(position);
        }
    }
    
    //Returns the array that has its values sorted.
    return blankSpacePositionArray.sort(function(a,b) {return a-b});
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