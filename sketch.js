//creating objects
var mario, marioImage;
var backgroundImage;
var button, buttonImage;
var startlogo, startlogoImage;
var startmusic;
var START = 1;
var END = 2;
var STORY = 0;
var gameState = STORY;
var story = 1;
var pressStartGroup, startButtonGroup;
var flyingBlock;
var life = 1;
var score = 0;
var backgroundG;

//loading the images & the animations
function preload(){
  marioImage = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png");
  marioJump = loadAnimation("mario_jump.png");
  backgroundImage = loadImage("background.jpg");
  buttonImage = loadImage("play.png");
  startlogoImage = loadImage("logo.png");
  startmusic = loadSound("start_music.mp3");
  pressStartImage = loadAnimation("start.png","start1.png");
  startButtonImage = loadImage("start_button.png");
  gameBackgroundImage = loadImage("mario background.png");
  mushroomImage = loadAnimation("mushroom1.png","mushroom2.png","mushroom3.png","mushroom4.png","mushroom5.png","mushroom6.png","mushroom7.png","mushroom8.png");
  turtleImage = loadImage("turtle1.png");
  heartImage = loadImage("heart.png");
  flyingBlockImage = loadImage("block1.png");
  loseSound = loadSound("mario_lose.mp3");
  livelost = loadSound("livelost.mp3");
}

//creating the canvas & the objects
function setup() {
  createCanvas(windowWidth, windowHeight);

  button = createSprite(width - 120,height - 100);
  button.addImage(buttonImage);
  
  pressStart = createSprite(windowWidth/2,windowHeight/2);
  pressStart.addAnimation("blink",pressStartImage);
  pressStart.scale = 0.5;

  mario = createSprite(windowWidth/4-150,windowHeight - 150);
  mario.addAnimation("mario",marioImage);
  mario.addAnimation("jump",marioJump)
  mario.scale = 0.5;
  
  heart1 = createSprite(windowWidth/8 - 45,windowHeight/8 - 35);
  heart1.addImage(heartImage);
  heart1.scale = 0.05;

  pressStartGroup = new Group();
  startButtonGroup = new Group();
  block = new Group();
  mushroomG = new Group();
  turtleG = new Group();
  backgroundG = new Group();
}

//creating draw function for giving functions & statements to the objects
function draw() {
  //clearing the screen
  background("black");
  
  if(gameState === STORY && story === 1){
    
    pressStart.visible = false;
    
   if(mousePressedOver(button)){

      background("black");

      story = 2;
      startlogo = createSprite(windowWidth/2,windowHeight/2);
      startlogo.addImage(startlogoImage);
      startlogo.scale = 1.2;

      startmusic.play();
      startmusic.loop();
      button.destroy();

  }
   
    background(backgroundImage);
 
}
  
if(story === 6){

}else{
    //pressStartGroup.destroyEach();
}
  
if(gameState === START){
    mario.visible = true;
    heart1.visible = true;

   spawnEnemies();
  
   end();
  
  if(frameCount % 400 === 0 ){
    
  flyingBlock = createSprite(windowWidth + 180,Math.round(random((windowHeight - 210),(windowHeight - 410))));
  flyingBlock.addImage(flyingBlockImage);
  flyingBlock.scale = 0.4;
  flyingBlock.velocityX = -8;
  flyingBlock.lifetime = windowWidth+50;
  flyingBlock.depth = 6;
  block.add(flyingBlock);
    
  flyingBlock.setCollider("rectangle",0,90,780,125);

}
  
  gameBackground.depth = 1;
  gameBackground.velocityX = -6;
  backgroundG.add(gameBackground);
  
  if(gameBackground.x < windowWidth / 2){
    spawnB();
    gameBackground.x = (windowWidth + gameBackgroundImage.width/2) - 20;
  }
  
  var invisibleline = createSprite(windowWidth/4 - 80, windowHeight - 102,windowWidth/4, windowHeight/50);
  invisibleline.visible = false; 
  
  if(mario.collide(invisibleline) || mario.isTouching(block)){
    if(keyDown("space")){
    mario.velocityY = -22;
    mario.changeAnimation("jump",marioJump);
    mario.scale = 0.2; 
    
    setTimeout(function(){
       mario.scale = 0.5;
       mario.changeAnimation("mario",marioImage);
     },1200);
      
    }
   }
  
  if(mario.isTouching(block)){
    mario.bounceOff(block);
  }
  
  if(mario.x < windowWidth/4 - 100){
    mario.x = windowWidth/4 - 100
  }
  mario.velocityY += 0.8;
  mario.collide(invisibleline);
  
  }
  
  if(gameState === END){
    mario.visible = false;
    backgroundG.destroyEach();
    startmusic.stop();
    
    mushroomG.destroyEach();
    turtleG.destroyEach();
    block.destroyEach();
    
    background("black");
    
    textSize(25);
    textFont("orbitron");
    textStyle("bold");
    textAlign(CENTER);
    fill("blue");
    text("YOU LOSE",windowWidth/2,windowHeight/2);
    text("PRESS 'R' TO RESTART",windowWidth/2,windowHeight/2 + 50);
    
    if(keyDown("r")){
      gameState = START;
      spawnB();
      life = 1;
      frameRate = 1;
      score = 0;
      startmusic.play();
      startmusic.loop();
      
      mario = createSprite(windowWidth/4-100,windowHeight - 150);
      mario.addAnimation("mario",marioImage);
      mario.addAnimation("jump",marioJump);
      mario.scale = 0.5;
      
      heart1 = createSprite(windowWidth/8 - 43,windowHeight/8 - 35);
      heart1.addImage(heartImage);
      heart1.scale = 0.05;
    }
  }

  //drawing the sprites
  drawSprites();

  if(gameState === START){
        
    textSize(20);
    textFont("orbitron");
    textStyle("bold");
    fill("red");
    text(score,windowWidth - 80,windowHeight/8 - 30);
    score = score + Math.round(1+ (getFrameRate()/60));
  }
 
  //applying function to change the gameState story to different parts
  gameStateChange();
  
}

//creating sunction to change story to differen parts
function gameStateChange(){
  
if(gameState === STORY){
 
  mario.visible = false;
  heart1.visible = false;
  
  if(story === 2){
    
    setTimeout(function(){
        story = 3;
      },2500);

    }
      textSize(25);
      textFont("orbitron");
      textStyle("bold");
      textAlign(CENTER);
      fill("blue");  

    if(story === 3){

    text("A MONSTER HAS KIDNAPPED THE PRINCESS PEACH",windowWidth/2,windowHeight/2 - 30);

      setTimeout(function(){
        story = 4;
      },3500);
    }

    if(story === 4){

    text("MARIO HAVE TO SAVE THE PRINCESS",windowWidth/2,windowHeight/2 - 30);

      setTimeout(function(){
        story = 5;
      },3500);
    }

    if(story === 5){

    text("YOU HAVE TO PLAY THE ROLE OF THE MARIO & SAVE THE PRINCESS",windowWidth/2,windowHeight/2 - 30);

      setTimeout(function(){
        story = 5.5;
      },4500);
    }

  if(story === 5.5){
    
    text("PRESS 'SPACE' TO SAVE MARIO FROM ENEMIES",windowWidth/2, windowHeight/2 - 30);
    
      setTimeout(function(){
        story = 5.6;
      },4500);
  }
  
  
  if(story === 5.6){
    
    text("YOU HAVE TWO LIVES ONLY",windowWidth/2, windowHeight/2 - 30);
    
      setTimeout(function(){
        story = 6;
      },3500);
  }
  
    if(story === 6){

      startButton = createSprite(windowWidth/2,windowHeight/2 + 210);
      startButton.addImage(startButtonImage);
      startButton.scale = 0.5;
      startButtonGroup.add(startButton);

    if(mousePressedOver(startButton)){
        story = 0;
        gameState = START;
        pressStartGroup.destroyEach();
        startButtonGroup.destroyEach();
        startlogo.destroy();
        background("black");
        frameRate = 1;
        spawnB();
    }
        
   }
 }
 
}

//creating function to spaen enemies
function spawnEnemies(){
 
  //creating turtles
  if(frameCount % 250 === 0){
   
    turtle = createSprite(windowWidth + 50,windowHeight - 135);
    turtle.addImage("turtle",turtleImage);
    turtle.scale = 0.05;
    turtle.velocityX = -5;
    turtle.lifetime = windowWidth;
    turtle.depth = 5;
    turtleG.add(turtle);
    
    turtle.setCollider("rectangle",0,0,1140,1020);
  }
  
  //creating random mushrooms
  var r = Math.round(random(170,171));
  if(frameCount % r === 0){
    
    mushroom = createSprite(windowWidth + 50,windowHeight - 135);
    mushroom.addAnimation("mushroom",mushroomImage);
    mushroom.scale = 0.15;
    mushroom.velocityX = -6;
    mushroom.lifetime = windowWidth;
    mushroom.depth = 3;
    mushroomG.add(mushroom);
    
    mushroom.setCollider("rectangle",0,0,300,330);
  }

  
}

//creating function to end the game
function end(){
if(mushroomG.isTouching(mario) || turtleG.isTouching(mario)){

 if(life > 0){
    
    life -= 1;
    heart1.destroy();
    mushroomG.destroyEach();
    turtleG.destroyEach();
    block.destroyEach();
    livelost.play();
   }else {
    
    mushroomG.destroyEach();
    turtleG.destroyEach();
    block.destroyEach();
    gameState = END;
    loseSound.play();
   }
    
  }
}

//creating function to create & set the game background in the screen
function spawnB(){
    
  gameBackground = createSprite(width/2,height/2);
  gameBackground.addImage(gameBackgroundImage);
  gameBackgroundImage.width = displayWidth;
  gameBackgroundImage.height = displayHeight;
  gameBackground.lifetime = windowWidth;
}