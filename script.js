//TODO: maybe adjust the time decution to 5s
//TODO: indicate a right or wrong answer
//TODO: Flash the clock when you get a wrong asnwer
//TODO:

//Create triva card deck and answer bucket
var answerBucket = ["3 Muskateers", "100 Grand", "Almond Joy", "Baby Ruth","Butterfinger", "Cadbury Carmel Egg", "Charleston Chew", "Heath", "Mars Bar", "Milky Way", "Payday", "Rolo", "Snickers", "Tootsie Roll" ];
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
var gameContentDiv = document.querySelector("#game-content");
var jumboContentDiv = document.querySelector("#jumbo-content");
var scoreDialogueDiv = document.querySelector("#end-game-dialogue");
var startBtn = document.querySelector("#play-button");
var nextBtn = document.querySelector("#flip-button");
var flipBtn = document.querySelector("#flip-button");
var clockH3 = document.querySelector("#clock");
var form = document.querySelector("#form");
var scoreboardBtn = document.querySelector("#scoreboard")
var scoreboardInput = document.querySelector("#initials")
//not a dom variable, but used to iterate over the radio ids
var radioIds = ["a1","a2","a3","a4"];


//Score
var score = 0;
//what we want out total time to count down from
var time = 5;
//controls what
//TODO: Need a way to randomize the card number, then pick random numbers between 1-13 that haven't been picked before
var cardNum = 1;
//variable to hold the chosen radio on next
var chosenAnswer;
//variable to hold the cards current correct answer
var currentAnswer;

//Start the game when play is pressed
function timer(){
    //setup the counter variable so we can clear the interval
    var counter = setInterval(startTime,1000);
    //callback for setInterval
    function startTime(){
        //End Game if time runs out
        if(time <= 0){
          endGame();
          clearInterval(counter);
        }else{
          time--;
          clockH3.textContent = `${time}s`;
        }
        
    };
};

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
  };

//Fired on Start and next --- function that will build the next trivia card
function cardBuild(i) {
  //use array method filter to return only the objects that match our card number(i argument)
  var currentCard = cardDeck.filter(obj => {
      return (obj.index === i);
    });
  //setup array for the possible answers
  var answers = [];
  //push the right answer to the array
  answers.push( currentCard[0].title);
  //update the currentAnswer variable with the right answer
  currentAnswer = currentCard[0].title;
  //while the array is less than 4 total
  while(answers.length <= 3){
      //grab a random number that will be an index of all total answers
      var rando = Math.floor(Math.random()*answerBucket.length);
      //check if the answer at index rando is already in the possible answers
      if(!answers.includes(answerBucket[rando])){
          //if it isn't in the array, push it onto it
          answers.push(answerBucket[rando]);
      };
  }
  //randomize the answer order by shuffle
  answers = shuffle(answers);

  gameContentDiv.setAttribute("class", "col-12 mt-5");
  clockH3.setAttribute("class", "clock")
  //set the picture displayed to the current trivia card item
  gameContentDiv.querySelector("img").setAttribute("src", currentCard[0].imgSrc);
  //go loop through radio buttons and update the values and labels to match the items from the answer array created above
  for (var i = 0; i < radioIds.length; i++){
    //values
    gameContentDiv.querySelector(`#${radioIds[i]}`).setAttribute("value", answers[i]);
    //labels
    gameContentDiv.querySelector(`#${radioIds[i]}-label`).textContent=answers[i];
  };
};

//fired on next button
function checkAnswer(answerToCheck){
  //check if the users guess, is euql to the current answer set in the build card function 
  if(answerToCheck === currentAnswer){
    //iff correct add to score
    score++;
    console.log(score);
  }else{
    //if incorrect, reduce the users time
    time = time - 10;
  }

};

//fired at time expires in timer function, or if you run out of cards in next click
function endGame(){
  //TODO: build the scoreboard with playButton
  gameContentDiv.setAttribute("class", "hide")
  clockH3.setAttribute("class", "hide");
  scoreDialogueDiv.setAttribute("class","jumbotron col-md-10 col-sm-12")
}

function scoreBoard(){
  scoreDialogueDiv.setAttribute("class","hide")
  var scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
}

scoreboardBtn.addEventListener("click", function(event){
  // var testScores = [{initial:"jak", score:4 },{initial:"hoo", score:5 }]
  var scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
  var newScore = {initial:scoreboardInput.value, score:score } 
  if(scoreboard === null){
    // just add the new score to localStorage
    localStorage.setItem("scoreboard",JSON.stringify(newScore));
  }else{
    scoreboard.push(newScore);
    localStorage.setItem("scoreboard",JSON.stringify(scoreboard));
  }
  scoreboard();
  
  
  // var scoresObj = JSON.parse() []
  scoreBoard();
})

//Start Game!
startBtn.addEventListener("click", function(event){
    //turn off the jumbotron intro section
    jumboContentDiv.style.display = "none";
    //fire the cardBuild function with the current triva card
    cardBuild(cardNum);
    //start the timer
    timer();
});

nextBtn.addEventListener("click", function(event){
  //Prevent default behavior of page refresh on form submit
  event.preventDefault();
  //setup variable that is all the radio buttons by name
  var ele = document.getElementsByName("answer");
  //cycle through the radio buttons a deactivate any that are checked
  for(var i=0;i<ele.length;i++){
    ele[i].checked = false;
  };
  //check the answer quality by running checkAnswer function, passing it the global variable of chosen answer set in form event listener
  checkAnswer(chosenAnswer);
  //iterate the cardNum global variable
  cardNum++;
  //ENDGAME if card num exceeds card deck
  if (cardNum > cardDeck.length){
    endGame()
  }else{
    //this is in there to instantly update the timer if you lost 10s, otherwise it waits until the next tick
    clockH3.textContent = `${time}s`
    //rebuild the card to the new number.
    cardBuild(cardNum);
  };
});

//listens for the users input on the radio buttons in the form
form.addEventListener("change", function(event){
  //each time there is change, loop through the radio DOM elements
  for (var i = 0; i < radioIds.length; i++){
    //if the radio button is checked 
    if(gameContentDiv.querySelector(`#${radioIds[i]}`).checked){
      //set the global variable chosen answer to the checked radio button. That answer is used in the check answer function
      chosenAnswer = gameContentDiv.querySelector(`#${radioIds[i]}`).value;
    };
  };
});