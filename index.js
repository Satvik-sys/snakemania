//Game constants and variable
let inputDir = {x:0, y:0};
let speed = 10;
let lastPaintTime= 0;
let snakeArr = [{
    x: 13 , y: 15
}]
food = {x:6, y:7};
const moveaudio = new Audio('movesound.mp3');
const gameoveraudio = new Audio('gameover.mp3');
const eatingaudio = new Audio('eatingaudio.mp3');
const gameaudio = new Audio('game.mp3');
const score = document.getElementById('score');
  var Score = 0 ;
const hiscoreBox = document.getElementById('Hiscore');

// Game Functions
function main(ctime) {
window.requestAnimationFrame(main);
// console.log(ctime)


if((ctime - lastPaintTime)/1000 < 1/speed){
return;
}

lastPaintTime= ctime
gameEngine();
}
function isCollide(sarr) {

    //IF you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
      if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y ){
       return true;
 }  
}

//If you bump into the wall 

 if(snakeArr[0].x >=18 || snakeArr[0].x <=0 || snakeArr[0].y >=18 || snakeArr[0].y <=0  )
 return true;
}

function gameEngine() {
    //Part 1: Updating the snake array & Food

    if(isCollide(snakeArr)){
        Score=0;
        score.innerHTML= "Score: "  + Score;
        
        moveaudio.pause();
        gameaudio.pause();
       
         gameoveraudio.play();
         inputDir = {x:0, y:0};
         alert("Game Over.Press any key to play again");
          snakeArr = [{
        x: 13 , y: 15
        }]
        gameaudio.play();
        moveaudio.play();
        
    }
    //If you have eaten the food, increment the score and regenerate the food

    if(snakeArr[0].y == food.y & snakeArr[0].x == food.x){
        eatingaudio.play();
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y})
        let a = 2;
        if(Score > hiscoreval){
            hiscoreval = Score;         
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "High score: " + Score;
        }
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
        Score = Score + 1;
        score.innerHTML= "Score: "+ Score; 
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        
        snakeArr[i+1] = {...snakeArr[i]};
    }


    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;
    //Part 2:  Display the snake and food
      
    //Display the snake
    board.innerHTML = "";
             snakeArr.forEach((e, index)=>{
            snakeElement= document.createElement('div');
             snakeElement.style.gridRowStart = e.y;
             snakeElement.style.gridColumnStart = e.x;
        
             if(index == 0){
                snakeElement.classList.add('head');   
             }
             else{snakeElement.classList.add('snake');}
                  
             board.appendChild(snakeElement);
});

    //Display the food
             
            foodElement= document.createElement('div');
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add('food');
             board.appendChild(foodElement);

}
//Main Logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
   hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));  
}

else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High score: " + hiscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
  
    inputDir =[{x:0, y:1}] 
    gameaudio.play(); // Start the Game
    moveaudio.play();
               
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

            case "ArrowDown":
              //  console.log("ArrowDown");

                inputDir.x = 0;
                inputDir.y = 1;
                break;


                case "ArrowRight":
           // console.log("ArrowRight");

            inputDir.x = 1;
            inputDir.y = 0;
            break;

            case "ArrowLeft":
            //console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})
