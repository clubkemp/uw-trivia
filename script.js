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
  { title: "Tootsie Roll", imgSrc: "./assets/tootsieRoll.jpg", index:13}
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
var leaderBoardOL = document.querySelector("#leaderboard")
var scoreAnnounceJumbo = document.querySelector("#score-announce")
var scoreh3 = document.querySelector("#score-header")
var wrongh3 = document.querySelector("#wrong")
var righth3 = document.querySelector("#right")
//not a dom variable, but used to iterate over the radio ids
var radioIds = ["a1","a2","a3","a4"];


//Score
var score = 0;
//what we want out total time to count down from
var time = 60;
//controls what
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
          clockH3.textContent = 0
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
    //turn off the the right or wrong div so you get a flash effect
    
    
    
  };
};

//fired on next button
function checkAnswer(answerToCheck){
  //check if the users guess, is euql to the current answer set in the build card function 
  if(answerToCheck === currentAnswer){
    //iff correct add to score
    score++;
    console.log(score);
    //turn on the right dialoge
    righth3.setAttribute("class", "right")
    //turns off after 400ms
    setTimeout(function(){ righth3.setAttribute("class", "hide"); }, 400);

  }else{
    //if incorrect, reduce the users time
    time = time - 10;
    //set the wrong header to visible real quick
    wrongh3.setAttribute("class", "wrong")
    //turn it off after 400ms
    setTimeout(function(){ wrongh3.setAttribute("class", "hide"); }, 400);
  }

};

//fired at time expires in timer function, or if you run out of cards in next click
function endGame(){
  //hide the game conetne
  gameContentDiv.setAttribute("class", "hide")
  //hide the clock
  clockH3.setAttribute("class", "hide");
  //unhide the scoreboard dialouge
  scoreDialogueDiv.setAttribute("class","jumbotron col-md-10 col-sm-12")
  //put the dialogue for hte score set to the users score
  scoreh3.textContent = `Your score was ${score} out of 13`
}

//This function fires on the event listener for the scoreboard button at the end of the game
function scoreBoard(){
  //turn off the game end announcment secion
  scoreAnnounceJumbo.setAttribute("class","hide")
  //setup and empty array to load the local memory into
  var array = [];
  //Setup variable for the sorted scoreboard
  var sortedScoreboard;
  //pull in the items frm local memory
  var scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
  //need to figure out if there are multiple items in the scoreboard to be sorted
  if(scoreboard.length >=2){
    sortedScoreboard = scoreboard.sort((a,b) =>{
      //this if statement compares all the items and sorts them on a return of if they are higher or lower based on score value
      if (a.score < b.score){
        return 1
      }else {
        return -1
      }
    })
    //If the scoreboard length is 2 or less, that means there is just one item, meaning it is not an array
  }else{
    //so to turn it into an array, we load our scoreboard object into our empty array
    array.push(scoreboard);
    //then we can set the sortedScoreboard equal to that array(because my for statement was already setup below)
    sortedScoreboard = array
  }
  //Now we go throug the entire soreted list, which might just be one thing
  for (var i=0; i<sortedScoreboard.length; i++){
    //create empty li tag
    var liElm = document.createElement("li");
    //populate the text content with the values from our two keys
    liElm.textContent = `Initials: ${sortedScoreboard[i].initial} ---- Score:${sortedScoreboard[i].score}`;
    //attach this li to the OL elements in the dom, before continuing on our loop
    leaderBoardOL.appendChild(liElm);
  }
}

//Lisetener for our scoreboard button
scoreboardBtn.addEventListener("click", function(event){
  //empty array
  var array = [];
  //first go and get the local memory
  var scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
  //then setup a single obj to this sessions game score
  var newScore = {initial:scoreboardInput.value, score:score } 
  //Need to check to see if there is scores(undefined), 1 item (object), or multiple (array of objects)  
  if(scoreboard === null){
    // just add the new score to localStorage
    //No obj in memory, just set the scoreboard to that item
    localStorage.setItem("scoreboard",JSON.stringify(newScore));
  }else if(scoreboard.length >=2){
    //multiple objects in scoreboard, array
    //push the newest score to array, 
    scoreboard.push(newScore);
    //then set it to the local memory
    localStorage.setItem("scoreboard",JSON.stringify(scoreboard));
  }else{
    // Single OBJ in memory
    //convert obj to array
    array.push(scoreboard);
    //then push the newest score
    array.push(newScore);
    //then set the whole deal to the local memory
    localStorage.setItem("scoreboard",JSON.stringify(array));
  }
  //fire scoreboard function to build the dom elements
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