// Game Constants & variables
let inputDir = { x: 0, y: -1 };
const foodSound = new Audio("./assets/music/food.mp3");
const gameOverSound = new Audio("./assets/music/gameover.mp3");
const moveSound = new Audio("./assets/music/move.mp3");
const musicSound = new Audio("./assets/music/music.mp3");
let speed = 5;
let lastRenderTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 15, y: 13 };
let score = 0;

// Game Functions
let main = (ctime) => {
  window.requestAnimationFrame(main);
  if ((ctime - lastRenderTime) / 1000 < 1 / speed) {
    return;
  }
  lastRenderTime = ctime;
  gameEngine();
};

let isCollide = (snakeArr) => {
for (let i = 1; i < snakeArr.length; i++) {
  if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y){
    return true;
  }
}
  if(snakeArr[0].x>=18 || snakeArr[0].y>=18 || snakeArr[0].x<=0 || snakeArr[0].y<=0 ){
  return true;
  }

}
;

let gameEngine = () => {
  // update snake array & food
  // console.log("gameengine started");
  musicSound.play();

  if (isCollide(snakeArr)) {
    musicSound.pause();
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over, Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    document.getElementById('score').innerHTML = score;

      // window.addEventListener("keydown",(e)=>{
      //   if(e==="Enter"){
      //     location.reload();
      //   }}

  }

  // if ate food
  //   console.log(snakeArr[0].x);
  //   console.log(snakeArr[0].y);
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score+=1;
    document.getElementById('score').innerHTML = score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b - a) * Math.random()),y: Math.round(a + (b - a) * Math.random())};
  }

  // move the snake
  for (let i = snakeArr.length - 2; i>=0; i--) { 
    snakeArr[i+1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

  // display snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) snakeElement.classList.add("head");
    else snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });
  // display food

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
};

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
