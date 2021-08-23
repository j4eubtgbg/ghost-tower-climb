var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = 1;
var stamina = 7;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage('ghost',ghostImg);
  ghost.scale = 0.3;

  doorsGroup = new Group();

  climbersGroup = new Group();
 // ghost.debug = true;
  //ghost.setCollider('rectangle',0,0,230,290);
}

function draw() {
  background(200);
 
 // console.log(stamina);
  d00r();

  if(tower.y > 400){
      tower.y = 300
    }
    drawSprites();
    fill('red');
    textSize(20);
    text('stamina= '+stamina,250,15);
    
  if(keyDown('a')){
    ghost.x = ghost.x-5;
  }
  if(keyDown('d')){
    ghost.x = ghost.x+5;
  }
  if(keyWentDown('space')&&stamina>0){
    ghost.velocityY = -15;
    stamina = stamina-1;
  }
  ghost.velocityY = ghost.velocityY+0.5;
  ghost.collide(climbersGroup);
  if(ghost.y>650){
    gameState = 0;
    ghost.destroy();
  }

  if(ghost.isTouching(climbersGroup)){
    stamina += 7;
    console.log('t');
  }

if(stamina>15){
  stamina=15;
}

  if(gameState===0){
    background = 'black';
    stroke('yellow');
    fill('red');
    textSize(30);
    text('Game Over',230,250);
  }
}

function d00r(){
if(frameCount%240 === 0){
  door = createSprite(200,-50);
  door.addImage('dor',doorImg);
  door.x = Math.round(random(120,400));
  door.velocityY = 1;
  door.lifetime = 800;
  doorsGroup.add(door);

  climber = createSprite(200,10);
  climber.addImage('dor',climberImg);
  climber.x = door.x;
  climber.velocityY = 1;
  climber.lifetime = 800;
  //climber.setCollider('rectangle',0,0,100,30);
  //climber.debug = true;
  climbersGroup.add(climber);

  ghost.depth = climber.depth+1;
  
}

}

