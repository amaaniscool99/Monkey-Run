var monkey, monkey_running;
var ground, invisibleGround, groundImage;

var gameOver, restart, gameOver_img, restart_img;
var BananaGroup, Banana_img;
var ObstacleGroup, Obstacle_img;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


var score;

function preload(){
  
  backImage = loadImage("jungle.jpg");
  monkey = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  Banana_img = loadImage("Banana.png");
  Obstacle_img =loadImage("stone.png");

  groundImage = loadImage("ground.jpg");
 
  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation(monkey_running);
  monkey.scale = 0.2;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug=true;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  ObstacleGroup = new Group();
  BananaGroup = new Group();
  
gameOver = createSprite(300,100);
restart = createSprite(300,140);
gameOver.addImage(gameOver_img);
gameOver.scale = 0.5;
restart.addImage(restart_img);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

  
  score = 0;
}

function draw() {
  background(180);
   text("Score: "+ score, 500,50);
  
  if (gameState === PLAY)
  {
      score = score + Math.round(getFrameRate()/60);
 

        if(keyDown("space")&& trex.y >= 159) {
          monkey.velocityY = -15;
        }

        monkey.velocityY = monkey.velocityY + 0.8

        if (ground.x < 0){
          ground.x = ground.width/2;
        }
     
        if (score>0 && score%100 === 0){
        }
        spawnBanana();
        spawnObstacle();
        
        //End the game when trex is touching the Obstacle
        if(ObstacleGroup.isTouching(monkey)){
          gameState = END;
          
        }
    
    }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    ObstacleGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  monkey.collide(invisibleGround);
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstacleGroup.destroyEach();
  BananaGroup.destroyEach();
  
   monkey.addAnimation("running", monkey_running);
  
  score = 0;
  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var Banana = createSprite(600,120,40,10);
    Banana.y = Math.round(random(80,120));
    Banana.addImage(Banana_img);
    Banana.scale = 0.1;
    Banana.velocityX = -3;
    
     //assign lifetime to the variable
    Banana.lifetime = 200;
   
    
    //add each cloud to the group
    BananaGroup.add(Banana);
  }
  
}

function spawnObstacle() {
  if(frameCount % 60 === 0) {
    var Obstacle = createSprite(600,165,10,40);
    Obstacle.velocityX = -4;
    
    //assign scale and lifetime to the obstacle           
    Obstacle.scale = 0.5;
    Obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstacleGroup.add(Obstacle);
  }
}