var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level= 0;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("level" + level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level" + level);   
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChoosenColor);
}

$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
   if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("success");

      if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
         nextSequence();
        }, 1000);
      }
    }
   else{
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game-over,Press any key to Restart");

    startOver();
   }

}


function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


   





