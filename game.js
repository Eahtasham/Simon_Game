const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

// Initialize game
function initGame() {
  $(document).on("keypress touchstart", startGame);
  $("#start-btn").click(startGame);
  $("#restart-btn").click(restartGame);
  
  // Add touch event listeners for buttons
  $(".btn").on("click touchstart", function(e) {
    e.preventDefault();
    if (!gameStarted) return;
    
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
}

function startGame() {
  if (gameStarted) return;
  
  gameStarted = true;
  $(document).off("keypress touchstart");
  $("#level-title").text("Level " + level);
  nextSequence();
}

function restartGame() {
  gameStarted = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("Press Any Key to Start").removeClass("animate__shakeX");
  $(document).on("keypress touchstart", startGame);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level).addClass("animate__pulse");
  
  setTimeout(() => {
    $("#level-title").removeClass("animate__pulse");
  }, 500);
  
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  // Enhanced animation with delay between sequences
  gamePattern.forEach((color, index) => {
    setTimeout(() => {
      animateButton(color);
      playSound(color);
    }, 600 * (index + 1));
  });
}

function animateButton(color) {
  const $btn = $("#" + color);
  $btn.addClass("animate__bounceIn");
  
  setTimeout(() => {
    $btn.removeClass("animate__bounceIn");
  }, 300);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play().catch(e => console.log("Audio play failed:", e));
}

function animatePress(currentColor) {
  const $btn = $("#" + currentColor);
  $btn.addClass("pressed");
  
  setTimeout(() => {
    $btn.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    handleWrongAnswer();
  }
}

function handleWrongAnswer() {
  playSound("wrong");
  
  $("body").addClass("game-over");
  $("#level-title").text("Game Over! Level " + level).addClass("animate__shakeX");
  
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  
  restartGame();
}

// Initialize the game when DOM is ready
$(document).ready(function() {
  initGame();
});