//Global constants
var timeAllowed = 20;
const daysNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

var startButton = document.getElementById("start-button");
var resetButton = document.getElementById("reset-button");
var dayName = document.getElementById("day-name");
var winCount = document.getElementById("wins");
var lossCount = document.getElementById("losses");
var timeLeft = document.getElementById("time-left");

startButton.addEventListener("click", function(){

    //Sets the initial value of allowed time.
    timeLeft.textContent = timeAllowed;

    // Start the timer.
    // startTimer();

    //Gets the day name randomly.
    var dayName = daysNames[Math.floor(Math.random() * daysNames.length)];
    // displayMessage(dayName);

    var blankDayName = getBlankDayName(dayName);
    // displayMessage(blankDayName);
});

function getBlankDayName(dayName){

    
    



    return dayName;
}

//Starts the timer function.
function startTimer(){
    var time = timeAllowed;
    
    var timeInterval = setInterval(function () {
        time--;

        //Sets the new time value.
        timeLeft.textContent = time;

        //Stops the timer and displays message that game is over.
        if(time === 0){
            clearInterval(timeInterval);

            //Displays specified message as day name.
            displayMessage("Game Over");
        }
      }, 1000);    
}

//Function to display specified message as day name.
function displayMessage(message){
    dayName.textContent = message;
}