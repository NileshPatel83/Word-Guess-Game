//Constants
const timeAllowed = 10;
const blankSpace = "_";
const lossesKey = "losses";
const winsKey = "wins";
const monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Global variables.

//Keeps track of time remaning. This is to stop key press event after the remaining time is 0.
var timeRemaining = -1;
var monthName;
var blankMonthName;
var timeInterval;

//Get elements from index file.
var startButton = document.getElementById("start-button");
var resetButton = document.getElementById("reset-button");
var monthNameText = document.getElementById("month-name");
var winCount = document.getElementById("wins");
var lossCount = document.getElementById("losses");
var timeLeft = document.getElementById("time-left");

//Event listener for start button.
startButton.addEventListener("click", function(event){

    if(event.target != startButton) return;

    //Sets the initial value of allowed time.
    timeLeft.textContent = timeAllowed;

    // Starts the timer.
    startTimer();

    //Gets the month name randomly.
    monthName = monthsNames[Math.floor(Math.random() * monthsNames.length)];

    //Gets array of blank space position from month name.
    //Letter in month name will be replaced by blank at these positions.
    var blankSpacePositionArray = getBlankSpacePositionArray(monthName);

    //Gets blank month name by replacing letters at blank space position array with underscore.
    blankMonthName = getBlankMonthName(monthName, blankSpacePositionArray);

    //Displays the value of blank month name.
    displayMessage(blankMonthName.join(""), monthNameText);
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
    
    timeInterval = setInterval(function () {
        timeRemaining--;

        //Sets the new time value.
        timeLeft.textContent = timeRemaining;

        //Stops the timer and displays message that game is over.
        if(timeRemaining === 0){
            clearInterval(timeInterval);

            //Displays specified message as month name.
            displayMessage("Game Over", monthNameText);

            //Gets the current value of losses and increments by 1.
            var totalLoss = parseInt(lossCount.textContent, 10) + 1;

            //Updates the local storage with new value of losses.
            updateLocalStorage(totalLoss, lossesKey);

            //Displays total losses in browser.
            displayMessage(totalLoss, lossCount);
        }
      }, 1000);    
}

//Updates the local storage with new value of losses or wins.
function updateLocalStorage(value, key){
    var storage = localStorage.getItem(key);

    if(storage === null){
        localStorage.setItem(key, value);
    }
}

//Function to display specified message specified element.
function displayMessage(message, element){
    element.textContent = message;
}

document.addEventListener('keydown', function (event){

    event.preventDefault();
    event.stopPropagation();
    
    //Doesn't do anything if timer is 0 or key is pressed before the game starts.
    if(timeRemaining === 0 || timeRemaining === timeAllowed) return;

    //Gets the key's lowercase value.
    var key = event.key.toLowerCase();

    //Gets the new name.
    //If typed key matches the letters of month name, replaces underscores with letter.
    //Replaces all underscores that matches.
    var newMonthName = getNewMonthName(key);

    //When new value matches the month name,
    //1. Stops the timer.
    //2. Displays results.
    //3. Stores results to local storage.
    if(newMonthName === monthName){

        //Stops the timer.
        clearInterval(timeInterval);
        
        //Gets the current value of wins and increments by 1.
        var totalWins = parseInt(winCount.textContent, 10) + 1;

         //Updates the local storage with new value of wins.
        updateLocalStorage(totalWins, winsKey);

        //Displays total wins in browser.
        displayMessage(totalWins, winCount);      
    }
});

//Gets the new name.
//If typed key matches the letters of month name, replaces underscores with letter.
//Replaces all underscores that matches.
function getNewMonthName(key){
    //Converts the month name into an array of letters.
    var monthNameLetters = monthName.split("");

    //Loops through month name letters.
    for(var i = 0; i < monthNameLetters.length; i++){

        //Checks whether the typed key matches one of the letter of month name.
        if (monthNameLetters[i].toLowerCase() === key){

            //if key matches and the letter is the first letter then makes the letter capital and replaces underscore with the letter.
            if( i === 0)
            {
                blankMonthName[i] = key.toUpperCase();
            }

            //If key matches then replaces underscore with the letter.
            else{
                blankMonthName[i] = key;
            }

            //Displays the new value.
            displayMessage(blankMonthName.join(""), monthNameText);
        }
    }

    return blankMonthName.join("");
}