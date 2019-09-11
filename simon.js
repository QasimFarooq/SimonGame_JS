var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0; 

var gameOver = false;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
	if(!started){
		$("#level-title").text("Level " + level);
		nextSequence();
    	started = true;
	}
	
});

$(".btn").on("click", function(){
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);	
	animatePress(userChosenColor);
	var last = (userClickedPattern.length) -1;
	checkAnswer(last);
	
	
});


function nextSequence(){
	userClickedPattern = [];
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	$("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);

	level++;
	$("#level-title").text("Level " + level);

}

function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currColor){
	$("#" + currColor).addClass("pressed");
	setTimeout(function() {
       $("#" + currColor).removeClass("pressed");
   }, 250);
}

function checkAnswer(currentLevel){

	if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
		console.log("success");
		if (userClickedPattern.length === gamePattern.length){

	        
	        setTimeout(function () {
	          nextSequence();
	        }, 1000);

     	 }
	}
	else{
		console.log("failure");
		var wrong = new Audio("sounds/wrong.mp3");
		wrong.play();

		$("body").addClass("game-over")

		setTimeout(function () {
	          $("body").removeClass("game-over");
	    }, 200);

	    $("h1").text("Game Over, Press Any Key to Restart");
	   
	    	startOver();
	}

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}




