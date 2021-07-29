var bg,bgImg;
var hero,heroImg;
var monster,monsterImg;
var monsterRunning;
var ruby,rubyImg;
var playbutton,playbuttonImg;
var gamename,gamenameImg;
var gameState = "wait";
var heroRunning;
var heroIdle;
var cactus1,cactus2,cactus3,cactus4;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle7,obstacle8;
var floorObstacle,upObstacle;
var floorObstacleGroup,upObstacleGroup;
var invisibleGround;
var heroDie;
var heroDizzy;
var ruby;
var score = 0;

function preload() {
  bgImg = loadImage("Background/floor.png");
  heroImg = loadAnimation("Hero/HERO/game hero.png");
  heroRunning = loadAnimation("Hero/Run/run1.png","Hero/Run/run2.png","Hero/Run/run3.png",
  "Hero/Run/run4.png","Hero/Run/run5.png","Hero/Run/run6.png","Hero/Run/run7.png");
  heroIdle = loadAnimation("Hero/Idle/heroIdle1.png");
  monsterImg = loadAnimation("Monster/MONSTER.png");
  monsterRunning = loadAnimation("Monster/monster1.png","Monster/monster2.png","Monster/monster3.png",
  "Monster/monster4.png","Monster/monster5.png","Monster/monster6.png","Monster/monster7.png","Monster/monster8.png",)
  rubyImg = loadImage("Ruby/ruby.png");
  //playbuttonImg = loadImage("Background/play3.png");
  gamenameImg = loadImage("Extreme Runner.png");
  cactus1 = loadImage("Obstacle/cactus1.png");
  cactus2 = loadImage("Obstacle/cactus2.png");
  cactus3 = loadImage("Obstacle/cactus3.png");
  cactus4 = loadImage("Obstacle/cactus4.png");
  obstacle1 = loadImage("Obstacle/obstacle1.png");
  obstacle2 = loadImage("Obstacle/obstacle2.png");
  obstacle3 = loadImage("Obstacle/obstacle3.png");
  obstacle4 = loadImage("Obstacle/obstacle4.png");
  obstacle5 = loadImage("Obstacle/obstacle5.png");
  obstacle6 = loadImage("Obstacle/obstacle6.png");
  obstacle7 = loadImage("Obstacle/obstacle7.png");
  obstacle8 = loadImage("Obstacle/obstacle8.png");
  heroDie = loadAnimation("Hero/Die/die5.png")
  heroDizzy = loadAnimation("Hero/Dizzy/dizzy1.png","Hero/Dizzy/dizzy2.png","Hero/Dizzy/dizzy3.png")
}

function setup() {

  createCanvas(1000,600);

  floorObstacleGroup = new Group();
  upObstacleGroup = new Group();

  //Front Page :-

  bg = createSprite(500,400);
  bg.addImage(bgImg);
  bg.scale = 2;

  hero = createSprite(850,290);
  hero.addAnimation("heroStanding",heroImg);
  hero.addAnimation("heroRunning",heroRunning);
  hero.addAnimation("heroIdle",heroIdle);
  hero.addAnimation("heroDie",heroDie);
  hero.addAnimation("heroDizzy",heroDizzy);
  hero.scale = 0.7;
  invisibleGround = createSprite(2500,460,5000,20);

  monster = createSprite(200,275);
  monster.addAnimation("monsterstanding",monsterImg);
  monster.addAnimation("monsterRunning",monsterRunning);
  monster.scale = 2.5;

  ruby = createSprite(525,275);
  ruby.addImage(rubyImg);
  ruby.scale = 0.7;

  playbutton = createImg("Background/play3.png");
  playbutton.position(460, 350);

  gamename = createSprite(525,50);
  gamename.addImage(gamenameImg);
  gamename.scale = 1.5;

}

function draw() {

  background("#DEF0F7");  

  console.log(hero.y);

  playbutton.mousePressed(()=>{
    gameState = "PLAY"
  });

  invisibleGround.visible = false;

  if(gameState == "PLAY"){
 
    SpawnObstacles();
    
    bg.visible = false;
    playbutton.hide();
    ruby.visible = false;
    gamename.visible = false;

    image(bgImg,-50,200,5000,400);

    hero.changeAnimation("heroIdle",heroIdle);
    //hero.x = 650;
    camera.x = hero.x-200;

    monster.changeAnimation("monsterRunning",monsterRunning);
    //monster.x = 50;
    monster.scale = 0.9;
    monster.velocityX = 4;


    if(keyDown(RIGHT_ARROW)){
      hero.x = hero.x+10;
    }

    if(keyDown(RIGHT_ARROW)){
      hero.changeAnimation("heroRunning",heroRunning);
      
    }

    if(keyWentUp(RIGHT_ARROW)){
      hero.changeAnimation("heroIdle",heroIdle);
      
    }

    if(keyDown(UP_ARROW)&&hero.y>=408.5){
      hero.velocityY = -15;
    }

    if(monster.isTouching(floorObstacleGroup)){
      monster.velocityY=-13;
    }

    hero.velocityY=hero.velocityY+1
    
    monster.velocityY=monster.velocityY+1
    console.log(hero.y);
  
    if(hero.isTouching(floorObstacleGroup)){
      hero.changeAnimation("heroDie",heroDie);
      gameState = "END"
    }

    if(hero.isTouching(upObstacleGroup)){
      
      hero.changeAnimation("heroDizzy",heroDizzy);
      gameState = "END";
    }

  }

  if(gameState == "END"){
    hero.velocityY=hero.velocityY+1
    monster.velocityX = 0;
    floorObstacleGroup.setVelocityXEach(0);
    upObstacleGroup.setVelocityXEach(0);
    
  }

  image(bgImg,-50,200,5000,400);
  hero.collide(invisibleGround);
  monster.collide(invisibleGround);

  text("SCORE "+ score,hero.x+100,100)

  drawSprites();
}

function SpawnObstacles(){

  if(frameCount%90==0){
    floorObstacle = createSprite(hero.x+400,430);
    floorObstacle.velocityX = -3;
    floorObstacleGroup.add(floorObstacle);
    //floorObstacle.debug = true;
    var rand = Math.round(random(1,8));
    if(rand == 1){
      floorObstacle.addImage(cactus1);
    }
    else if(rand == 2){
      floorObstacle.addImage(cactus2);
    }
    else if(rand == 3){
      floorObstacle.addImage(cactus3);
    }
    else if(rand == 4){
      floorObstacle.addImage(cactus4);
    }
    else if(rand == 5){
      floorObstacle.addImage(obstacle1);
    }
    else if(rand == 6){
      floorObstacle.addImage(obstacle2);
    }
    else if(rand == 7){
      floorObstacle.addImage(obstacle3);
    }
    else if(rand == 8){
      floorObstacle.addImage(obstacle4);
    }
  }

  if(frameCount%160==0){
    upObstacle = createSprite(hero.x+400,230);
    upObstacle.velocityX = -3;
    upObstacleGroup.add(upObstacle);
    var rand = Math.round(random(1,4));
    if(rand == 1){
      upObstacle.addImage(obstacle5);
    }
    else if(rand == 2){
      upObstacle.addImage(obstacle6);
    }
    else if(rand == 3){
      upObstacle.addImage(obstacle7);
    }
    else if(rand == 4){
      upObstacle.addImage(obstacle8);
    }
  }

}