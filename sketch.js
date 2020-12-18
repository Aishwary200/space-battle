var eBullet;
var playerPlane1, playerPlane2, playerPlane3, playerImg;
var enemyPlane, enemyImg;
var background, backImg;
var bulletImg;
var enemyGroup;
var eBulletGroup, pBulletGroup;
var chances = 2;
var p1 = true, p2 = false, p3 = false
var gameState = "play";
var blast;
var pbulletImg,eBulletImg;

function preload() {
  backImg = loadImage("images/space.jpg")
  playerImg = loadImage("images/player.png")
  pbulletImg = loadImage("images/pBullet1.jpg")
  ebulletImg = loadImage("images/eBullet1.jpg")
  enemyImg = loadImage("images/enemy1.png")
  blast = loadImage("images/blast1.png")
}
//scales
// playerPlane1=0.3
// bullet=0.1
// enemy1=0.2
// booster=0.5
function setup() {
  createCanvas(1000, 600)
  background = createSprite(500, 300);
  background.addImage(backImg)
  playerPlane1 = createSprite(500, 400, 50, 50);
  playerPlane1.addImage(playerImg)
  playerPlane1.scale = 0.2
  enemyGroup = new Group();
  eBulletGroup = new Group();
  pBulletGroup = new Group();
  playerPlane1.debug = true
}
function draw() {
  if (background.y > 400) {
    background.y = 300;
  }
  if (gameState === "play") {
    background.velocityY = 1
    if (keyDown("space")) {
      playerBullet();
    }
    spawnEnemyPlane();
    if (p1) {
      destroyPlayer(playerPlane1);
      console.log(1)
    }
    else if (p2) {
      destroyPlayer(playerPlane2);
      console.log(2)
    }
    else if (p3) {
      console.log(3)
      gameState = "end";
    }

    destroy(pBulletGroup, enemyGroup)

    if (p1) {
      keyNavigation(playerPlane1);
    }
    else if (p2) {
      keyNavigation(playerPlane2)
    }
    else if (p3) {
      keyNavigation(playerPlane3)
    }
  }
  drawSprites();
  if (gameState === "end") {
    gameOver();
  }
  fill("white")
  textSize(20)
  textFont("Courier New");
  text("Chances left: " + chances, 700, 50)
}
function spawnEnemyPlane() {
  if (World.frameCount % 40 === 0) {
    var rand = Math.round(random(100, 300));
    var r=Math.round(random(1,2))
    switch(r){
      case 1: enemyPlane = createSprite(1000, rand, 50, 50);
      enemyPlane.velocityX = -5;
      break;
      case 2: enemyPlane = createSprite(0, rand, 50, 50);
      enemyPlane.velocityX = 5;
      break;
      default: break;
    }
    
    enemyPlane.addImage(enemyImg)
    enemyPlane.debug = true

    enemyPlane.scale = 0.1;
    

    enemyGroup.add(enemyPlane)
    if (enemyPlane.y < 550 || enemyPlane.x < 900) {
      enemyBullet(rand);
    }

  }

}
function destroy(group1, group2) {
  for (var i = 0; i < group2.length; i++) {
    if (group2.get(i).isTouching(group1)) {
      group2.get(i).addImage(blast)
      // group2.get(i).destroy();
      // var blast1=createSprite(group2[0].position.x,group2[0].position.y,20,20)
      // blast1.addImage(blast)
      // blast1.scale=0.2
      // blast1.velocityX=-2
      console.log(group2)

      //group2.addImage(blast)
    }
  }
}
function enemyBullet(rand) {

  if (World.frameCount % 20 === 0) {

    eBullet = createSprite(1000, rand, 10, 10);
    eBullet.addImage(ebulletImg);
    eBullet.scale = 0.5;
    eBullet.debug=true;


    eBullet.velocityY = 5;
    eBullet.depth = playerPlane1.depth
    playerPlane1.depth += 1
    eBullet.x = enemyPlane.x;

    eBulletGroup.add(eBullet)

    eBullet.velocityX = enemyPlane.velocityX;

  }

}
function playerBullet() {
  var bullet = createSprite(150, 350, 10, 10);
  bullet.addImage(pbulletImg);
  bullet.scale = 0.3;

  bullet.velocityY = -5;
  if (p1) {
    bullet.x = playerPlane1.x;
    bullet.y = playerPlane1.y;
  }
  else if (p2) {
    bullet.x = playerPlane2.x;
    bullet.y = playerPlane2.y;
  }
  else if (p3) {
    bullet.x = playerPlane3.x;
    bullet.y = playerPlane3.y;
  }
  pBulletGroup.add(bullet)
}
function keyNavigation(playerPlane) {
  if (keyDown("up")) {
    playerPlane.y = playerPlane.y - 10;
  }
  if (keyDown("down")) {
    playerPlane.y = playerPlane.y + 10;
  }
  if (keyDown("left")) {
    playerPlane.x = playerPlane.x - 10;
  }
  if (keyDown("right")) {
    playerPlane.x = playerPlane.x + 10;
  }
}
function destroyPlayer(playerPlane) {
  if (eBulletGroup.isTouching(playerPlane)) {
    playerPlane.destroy();

    if (playerPlane === playerPlane1) {
      p1 = false
      p2 = true
      chances -= 1
      playerPlane2 = createSprite(500, 400, 50, 50);
      playerPlane2.addImage(playerImg)
      playerPlane2.scale = 0.2;

    }
    if (playerPlane === playerPlane2) {
      p2 = false
      p3 = true
      chances -= 1
      playerPlane3 = createSprite(500, 400, 50, 50);
      playerPlane3.addImage(playerImg)
      playerPlane3.scale = 0.2;

    }

  }
}
function gameOver() {
  enemyGroup.setVelocityEach(0)
  eBulletGroup.destroyEach();
  background.velocityY = 0
  textSize(25)
  fill("red")
  text("Game Over", 200, 200)
}