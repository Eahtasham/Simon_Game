const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];



var level=0;
function nextSequence() {
    userClickedPattern=[];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    level++;
    $("#level-title").text("level "+level);
    
}

// Call the nextSequence function whenever you want to generate the next color in the game
function playSound(name){
    $("#" + name).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
    
}
var flag=0;

$(document).keypress(function(event){
    if(flag==0){
        nextSequence();
        flag=1;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(gamePattern.length==userClickedPattern.length){
            
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
        console.log("correct");
    }
    else{
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("Wrong");
    }
}

function startOver(){
    level=0;
    flag=0;
    gamePattern=[];
}
console.log(userClickedPattern);
console.log(gamePattern);
