var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

let fadeTime = 50; //ms for fadeIn and fadeOut annimation

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    // Selecting the button
    var currentButton = $("#" + randomChosenColour);
    currentButton.fadeOut(fadeTime).fadeIn(fadeTime);
    gamePattern.push(randomChosenColour);
    level ++
    // Updating the h1 to show the level 
    $("h1").text("Level " + level);
};

function playSound(name){
    var soundDir = "sounds/" + name + ".mp3";
    var audio = new Audio(soundDir);
    audio.play();   
}

function annimatePress(currentColour){
    var currentButton = $("#" + currentColour);

    // Adding the pressed class and then quickly removing it
    currentButton.addClass("pressed");
    setTimeout(function(){
        currentButton.removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    annimatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

// Detecting when a keyboard key has been pressed
$("body").keypress(function(){
    if (level === 0){
        $("h1").text("Level 0");
        nextSequence();
    }
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if (userClickedPattern.length == gamePattern.length){
            // The user completed the sequence
            setTimeout(function (){
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
        
    } else if (level > 0) {
        // The user failed 
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        // Changing the background colour to red 
        $("body").addClass("game-over");
        // Removing the game-over class after 200 ms 
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        // Changing the h1
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}