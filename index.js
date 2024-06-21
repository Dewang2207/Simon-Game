var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern =[];

// var to keep track of when to start the game
var started = false;

// var for displaying score
var HighScore = 0;
var YourScore = 0;

// var to keep track of game level
level = 0;

var userClickedPattern = [];

// function for making sound when any button is clicked
function playSound(key){
    var sound = new Audio("sounds/" + key + ".mp3");
    sound.play();
}


// function to show animation when any putton is pressed
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    // delay of 100 milliseconds
    var delay = 100 // milliseconds
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, delay);
}


// function to display to user which color block to target
function nextSequence(){
    userClickedPattern =[];
    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*3) + 1;// number b/w 1 & 3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // animation for displaying color block to user
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // display sound according to color
    playSound(randomChosenColour);
    // update the level
    score(level-1);
}


// function for game-over
function gameOver(){
    // display background red when wrong
    $("body").addClass("game-over");
    var delay1 = 200 // milliseconds
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, delay1);

    //play sound when wrong
    playSound("wrong");

    // display game-over when wrong
    $("#level-title").text("Game Over, Press any key to Restart");
}


//function to make game restart after it game-over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// function to display score
function score(currentLevel){
    YourScore = (currentLevel )*10;
    if(YourScore > HighScore){
        HighScore = YourScore;
    }
    $(".high").text("HIGH-SCORE: " + HighScore );
    $(".your").text("YOUR-SCORE: " + YourScore );
}

// function to check answer after each level is complete
function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }else{
        gameOver();
        startOver();

    }
}


// function to detect key press to start the game
$(document).keypress(function(){
    if(started == false){
        nextSequence();
        started = true;
    }
    $("#level-title").text("Level " + level);
    $(".high").text("HIGH-SCORE: " + HighScore);
});


// to detect mouse click and storing the clicked button colour
$(".btn").click(function(){
// ** can't write ("button")--> beacause it is not a tag, it is a type
    var userChosenColour = $(this).attr("id");
// creating an array to store buttons clicked by user
    userClickedPattern.push(userChosenColour);
// make sound when click
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});









