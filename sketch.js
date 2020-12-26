
let End = 0;
let Play = 1;
let gameState = Play;
var car3Image;
var playercar,playercarImage;
var car2Image;
var car1Image;
var trackImage;
var carGroup;
var carCrashing;
var player;
var back;
let score = 0;
var gameOver, resetButton;
var gameOverImage, resetImage
var timeMin, timeHour;


function preload() {
 
  resetImage = loadImage("images/restart.png");
  gameOverImage = loadImage("images/gameover.png");
  trackImage = loadImage("images/track.jpg");
  car1Image = loadImage("images/car1.png");
  car2Image = loadImage("images/car2.png");
  car3Image = loadImage("images/car3.png");
  playercarImage = loadImage("images/car4.png");
  carCrashing = loadSound("crashSound.flac");
}
  function setup() {
  createCanvas(600, 600);
    
    timeMin = minute();
    timeHour = hour();
    back = createSprite(300,300,600,600)
    back.addImage(trackImage);
    back.velocityY = 8;
    
    player = createSprite(300,500,25,25);
    player.addImage(playercarImage);
    player.scale = 0.5;
    
    gameover = createSprite(300,300-30,50,30);
    gameover.addImage(gameOverImage);
    gameover.scale = 0.5;
    gameover.visible = false;
    
    resetButton = createSprite(300,360,30,30);
    resetButton.addImage(resetImage);
    resetButton.scale= 1; 
    resetButton.visible = false;               

    carGroup = new Group();
    
    
  }
 
 

function draw() {
  background("white");
 
  if (gameState === Play) {
    if (frameCount % 20 === 0) {
      
      var rand = Math.round(random(1, 4));
      switch (rand) {
        case 1:
          var car1 = createSprite(Math.round(random(50 ,  780)), 10, 25, 25);
          car1.addImage(car1Image);
          car1.velocityY = 5;
          car1.lifetime = 700;
          car1.scale = 0.5;
          carGroup.add(car1);
          break;
        case 2:
           var car2 =    createSprite(Math.round(random(50, 780)), 0, 10, 10);
           car2.addImage(car2Image);
           car2.velocityY = 5;
           car2.lifetime =700;
           car2.scale = 0.5;
           carGroup.add(car2);
          break;
        case 3:
          var car3 =    createSprite(Math.round(random(50,480)), 0, 10, 10);
          car3.addImage(car3Image);
          car3.velocityY = 5;
          car3.lifetime = 700;
          car3.scale = 0.5;
          carGroup.add(car3);
          break;
        default:
          break;
      
    
  
      }
  }
  
  if (back.y > 600){
      back.y = 300;
    }
  if (keyDown("RIGHT_ARROW")) {
    player.x = player.x + 5;
  }
  if (keyDown("LEFT_ARROW")) {
   player.x = player.x - 5;
  }
  if (carGroup.isTouching(player)){
    carCrashing.play();
    gameState = End;
  }
  if (frameCount % 4 === 0) {
    score = score + 2;
  }
} 
  if (gameState === End) {
    carGroup.setVelocityYEach(0);
    gameover.visible = true;
    resetButton.visible = true;
    back.velocityY = 0;
    }
   
  
   
  if (mousePressedOver(resetButton)) {
    reset();
    resetButton.visible = false;
  }
    
  drawSprites();
  textSize(30);
  fill("green");
  stroke("black")
  strokeWeight(5);
  text("Score :" + score, 450,50);
  stroke("blue")
  strokeWeight(5);
  text("Time -" + " " + timeHour + " : " + timeMin, 400,100);
}
function reset() {
  carGroup.setVelocityYEach(5);
  carGroup.destroyEach();
  gameState = Play;
  player.x = 300;
  back.velocityY = 2;
  gameover.visible = false;
  score -= score;
}