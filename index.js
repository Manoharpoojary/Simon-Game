
var level=0;
var buttonColors=["green", "red", "yellow", "blue"];
var gamePattern=[];
var playerChosenPattern=[];
started=false;
$("body").on("keydown",function(){
    if(!started){
        nextSequence();
        started=true;
    }
});
playerMove();


function nextSequence(){
    level+=1;
    playerChosenPattern=[];
    $("h1").text("Level "+level);
    randomColorChosen=buttonColors[Math.floor(Math.random()*4)];
    $("#"+randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
    gamePattern.push(randomColorChosen);
}


function playAnimation(val){
    $("."+val).addClass("pressed");
    setTimeout(function(){
        $("."+val).removeClass("pressed");
    },100);
}  

function playSound(val){
    var audio = new Audio("sounds/" + val + ".mp3");
    audio.play();
    
}

function gameOver(){
    level=0;
    gamePattern=[];
    started=false;
    
}
function checkAnswer(currentLevel){
     if(gamePattern[currentLevel]===playerChosenPattern[currentLevel]){
          console.log("success")
          if(playerChosenPattern.length==gamePattern.length){
            setTimeout(nextSequence,1500);
          }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        var audio1=new Audio("sounds/wrong.mp3");
        audio1.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        gameOver();
    }


}
function playerMove(){
    $(".btn").on("click",function(){
        playerChosenPattern.push(this.id);
        playAnimation(this.id);
        playSound(this.id);
        checkAnswer(playerChosenPattern.length-1);
})
}