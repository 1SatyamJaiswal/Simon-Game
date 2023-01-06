var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

function playSound(name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animateButton(currentButton) {
    $("#"+currentButton).addClass("pressed");
    setTimeout( function(){
        $("#"+currentButton).removeClass("pressed");
    },100);
}

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }  
}

$(".btn").click( function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    animateButton(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userChosenColor);
});

$(document).keydown( function(){
   if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
   }
});

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }