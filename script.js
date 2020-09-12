//TODO: setup your DOM Variables
// var jumbotronDiv  = document.querySelector(".jumbotron")
var gameContentDiv = document.querySelector("#game-content")
var jumboContentDiv = document.querySelector("#jumbo-content")
var startBtn = document.querySelector("#play-button")


var clockH3 = document.querySelector("#clock")
var time = 3
// TODO:Start the game when play is pressed
function timer(){
    var counter = setInterval(startTime,1000);
    function startTime(){
        time--
        console.log(time)
        if(time === 0){
            //TODO:Endgame
            clearInterval(counter);
        }
    }
}

//Start Game!
startBtn.addEventListener("click", function(event){
    //turn off the jumbotron intro section
    jumboContentDiv.style.display = "none"
    //TODO:Access the game object and grab first trivia card
    //turn on the game content
    gameContentDiv.setAttribute("class", "col-12 mt-5")
    timer();
})



    //TODO: Create clock
    // TODO: replace hero with UL questions
//TODO: use setInterval to start counting down, every time the clock ticks adjust the clock on the DOM
// TODO: every time the player gets an answer right add to score
// TODO: every time the player gets an answer wrong, subtract time.

