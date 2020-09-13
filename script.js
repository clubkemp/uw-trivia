//Create triva card deck and answer bucket
var answerBucket = ["3 Muskateers", "100 Grand", "Almond Joy", "Baby Ruth","Butterfinger", "Cadbury Carmel Egg", "Charleston Chew", "Heath", "Mars Bar", "Milky Way", "Payday", "Rolo", "Snickers", "Tootsie Roll" ]
var cardDeck = [
  { title: "3 Muskateers", imgSrc: "./assets/3muskateers.JPG", index:1},
  { title: "100 Grand", imgSrc: "./assets/100grand.jpeg", index:2},
  { title: "Almond Joy", imgSrc: "./assets/almondJoy.JPG", index:3},
  { title: "Butterfinger", imgSrc: "./assets/butterfinger.jpeg", index:4},
  { title: "Cadbury Carmel Egg", imgSrc: "./assets/cadburyCarmelEgg.jpeg", index:5},
  { title: "Charleston Chew", imgSrc: "./assets/charlestonChew.jpeg", index:6},
  { title: "Heath", imgSrc: "./assets/heath.jpeg", index:7},
  { title: "Mars Bar", imgSrc: "./assets/mars.jpeg", index:8},
  { title: "Milky Way", imgSrc: "./assets/milkyWay.jpeg", index:9},
  { title: "Payday", imgSrc: "./assets/payday.jpeg", index:10},
  { title: "Rolo", imgSrc: "./assets/rolo.jpeg", index:11},
  { title: "Snickers", imgSrc: "./assets/snickers.jpeg", index:12},
  { title: "Tootsie Roll", imgSrc: "./assets/tootsieROll.jpg", index:13}
];

//DOM Variables
// var jumbotronDiv  = document.querySelector(".jumbotron")
var gameContentDiv = document.querySelector("#game-content")
var jumboContentDiv = document.querySelector("#jumbo-content")
var startBtn = document.querySelector("#play-button")
var nextBtn = document.querySelector("#flip-button")
var flipBtn = document.querySelector("#flip-button")
var clockH3 = document.querySelector("#clock")
var form = document.querySelector("#form")
var radioIds = ["a1","a2","a3","a4"]

//what we want out total time to count down from
var time = 3
//controls what
var cardNum = 1
//
var chosenAnswer = ""

//Start the game when play is pressed
function timer(){
    //setup the counter variable so we can clear the interval
    var counter = setInterval(startTime,1000);
    //callback for setInterval
    function startTime(){
        //TODO: End Game
        if(time === 0){
            //TODO:Endgame
            clearInterval(counter);
        }
        //TODO:UPdate the DOM with the new time
        time--
    }
}

//Fisher-Yates Shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

//function that will build the next trivia card
function cardBuild(i) {
    //use array method filter to return only the objects that match our card number(i argument)
    var currentCard = cardDeck.filter(obj => {
        return (obj.index === i)
      });
    //setup array for the possible answers
    var answers = [];
    //push the right answer to the array
    answers.push( currentCard[0].title)
    //while the array is less than 4 total
    while(answers.length <= 3){
        //grab a random number that will be an index of all total answers
        var rando = Math.floor(Math.random()*answerBucket.length)
        //check if the answer at index rando is already in the possible answers
        if(!answers.includes(answerBucket[rando])){
            //if it isn't in the array, push it onto it
            answers.push(answerBucket[rando])
        }
    }
    //randomize the answer order by shuffle
    answers = shuffle(answers);

    gameContentDiv.setAttribute("class", "col-12 mt-5");
    //TODO:Set the answer content using the answers Array
    gameContentDiv.querySelector("img").setAttribute("src", currentCard[0].imgSrc);
    for (var i = 0; i < radioIds.length; i++){
      gameContentDiv.querySelector(`#${radioIds[i]}`).setAttribute("value", answers[i]);
      gameContentDiv.querySelector(`#${radioIds[i]}-label`).textContent=answers[i];
    }
   
    form.addEventListener("change", function(event){
      for (var i = 0; i < radioIds.length; i++){
        if(gameContentDiv.querySelector(`#${radioIds[i]}`).checked){
          chosenAnswer = gameContentDiv.querySelector(`#${radioIds[i]}`).value
        }
      };
    })
    
    
    

}

nextBtn.addEventListener("click", function(event){
  event.preventDefault();
  console.log(chosenAnswer);
  cardNum++;
  cardBuild(cardNum);
});

//Start Game!
startBtn.addEventListener("click", function(event){
    //turn off the jumbotron intro section
    jumboContentDiv.style.display = "none"
    //fire the cardBuild function with the current triva card
    cardBuild(cardNum);
    //start the timer
    timer();
});
//TODO: Add event listener for the next button
//TODO: Create a function that adds score or subtracts time