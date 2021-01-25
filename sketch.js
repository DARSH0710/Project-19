var monkeyImage, monkey ;
var banana, bananaImage, jungle, jungleImage;
var stone, stoneImage, count = 0;
var invisibleGround;
var over, gameOverImage
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
  monkeyImage = loadAnimation("https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/27bb997e-cc27-496b-88af-f463c483ea0b.png","https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/ca882dd9-18e9-4c47-b9c9-c10db4580fbc.png","https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/32452440-6f31-4ae3-bce5-da5bf2739883.png", "https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/c4c8083c-755e-4b39-b9ca-001dcaa99eef.png",     "https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/4f6ab78c-df0f-49a6-b12d-6764b5c44351.png", "https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/2843a316-7af4-4f27-829e-d4dd5f6bf5bb.png", "https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/d91f6a39-0bb4-4a0d-8a8c-545692f71c30.png", "https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/68bdc386-0da3-4fe9-908d-2d3ac81eb796.png", "https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/7dd955a7-1545-4f26-9f8d-4a6f070d0fab.png", "https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/fd1e2a59-bdf9-4100-b0fb-e34cc3aea4bf.png");
  
  jungleImage = loadAnimation("https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/96dd7fed-67db-4914-97ed-2ecd46fd5b17.jpg");
  
  bananaImage = loadAnimation("https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/b5cae963-0a1b-4427-b2f7-2f991f281794.png");
  stoneImage = loadAnimation("https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/0b3e9497-3b30-42f9-9611-2414772b7446.png");
  
  gameOverImage = loadAnimation("https://assets.editor.p5js.org/5eeaf7e8dd37af0024df345c/a71b5e1b-636a-4c4a-a68b-59e299496127.jpg");
}



function setup() {
  createCanvas(400, 400);
  
  jungle = createSprite(200,200,400,400)
  jungle.addAnimation("moving", jungleImage);
  jungle.scale = 0.56
  jungle.velocityX = -4;
  
  monkey = createSprite(80,320,10,10);
  monkey.addAnimation("Running", monkeyImage);
  monkey.scale = 0.1
  
  invisibleGround = createSprite(200,360,400,20);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  over = createSprite(200,200,400,400);
  over.visible = false
  over.addAnimation("over", gameOverImage);
}

function draw() 
{
  background(220);
  
  if(gameState === PLAY)
  {
  monkey.collide(invisibleGround);
    
  if (jungle.x<200)
  {
    jungle.x = jungle.width/4;
  }
    
  monkey.velocityY = monkey.velocityY+0.8;
  spawnBanana();
  spawnStone();
  
  if (keyDown("space") && monkey.y>285)
  {
    monkey.velocityY = -12;
  }
  
  if (bananaGroup.isTouching(monkey))
  {
    count = count+10; 
    bananaGroup.destroyEach();
  } 
 
 switch(count)
  {
    case 10 : monkey.scale = 0.12;
              break;
    case 20 : monkey.scale = 0.14;
              break;    
    case 30 : monkey.scale = 0.16;
              break;  
    case 40 : monkey.scale = 0.18;
              break;    
              default : break;   
  }            
  if (stoneGroup.isTouching(monkey) && monkey.scale<0.11)
  {
    monkey.scale = 0.1
    count = 0;
    stoneGroup.destroyEach();
    gameState  = END;
  }
    
   if (stoneGroup.isTouching(monkey))
   {
     monkey.scale = 0.1
     count = 0;
     stoneGroup.destroyEach();
   }
  
  }  
  
  else if (gameState === END)
  {
    
  monkey.destroy();
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    jungle.destroy();
    over.visible = true;
  }

  drawSprites();

  if (gameState===PLAY)
  {
  fill("brown");
  textSize(18);
  text("Score: " + count, 300,100);
  }
}  
  
 function spawnBanana()
{
  if(frameCount % 60 === 0) {
  banana = createSprite(400,random(170,240));
  banana.addAnimation("flying", bananaImage);
  banana.velocityX = -6
    
     //assign scale and lifetime to the obstacle           
    banana.scale = 0.05;
    banana.lifetime = 300;
    //add each obstacle to the group
    bananaGroup.add(banana);

    
  }
}

function spawnStone()
{
  if(frameCount % 80 === 0) {
  stone = createSprite(400,340);
 stone.addAnimation("banana", stoneImage);
  stone.velocityX = -6
    
     //assign scale and lifetime to the obstacle           
    stone.scale = 0.09;
    stone.lifetime = 300;
    //add each obstacle to the group
    stoneGroup.add(stone);
    
  }
}

