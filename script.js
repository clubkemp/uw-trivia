//TODO: setup your DOM Variables
// var jumbotronDiv  = document.querySelector(".jumbotron")
var gameContentDiv = document.querySelector("#game-content")
var jumboContentDiv = document.querySelector("#jumbo-content")
var startBtn = document.querySelector("#play-button")


var clockH3 = document.querySelector("#clock")
var time = 10

// TODO:Start the game when play is pressed
startBtn.addEventListener("click", function(event){
    jumboContentDiv.style.display = "none"
    gameContentDiv.setAttribute("class", "col")

})
    //TODO: Create clock
    // TODO: replace hero with UL questions
//TODO: use setInterval to start counting down, every time the clock ticks adjust the clock on the DOM
// TODO: every time the player gets an answer right add to score
// TODO: every time the player gets an answer wrong, subtract time.

