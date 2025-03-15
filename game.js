var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1 );
    console.log(userClickedPattern);
})

function nextSequence(){
    level ++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    var randomChoseColour = buttonColours[randomNumber];
    gamePattern.push(randomChoseColour);
    $("#" + randomChoseColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoseColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            } , 1000);
        }
    }

    else{
        console.log("fail");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        var aud = new Audio("sounds/wrong.mp3");
        aud.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        started = false;
        level = 0;
    }
}


$(document).keypress(function(event){
    if (started === false){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true ;
    }
    console.log(started);
})


console.log(gamePattern);
console.log(started);
